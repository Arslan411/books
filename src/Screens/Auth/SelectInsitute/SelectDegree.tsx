import React, {useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';

import Theme from '../../../Utils/Theme';
import Header from '../../../Components/Header/Header';

import Button from '../../../Components/Button/Button';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import DropDownSearch from '../../../Components/Search/DropdownSearch';
import {Formik} from 'formik';
import {degreeInitialValue, degreeValidation} from '../../../Utils/validation';
import Input from '../../../Components/Input/Input';
import {register} from '../../../Redux/Reducers/Authentication/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import {randomNameGenerator} from '../../../Utils/functions';

const SelectDegree = ({navigation, route}: any) => {
  const {isLoading} = useSelector((state: any) => state.auth);
  const [isSelectedGrade, setSelectedGrade] = useState('');
  const [grade, setGrade] = useState(false);
  const gradeArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const {t} = useTranslation('institute');
  var {userData, edit} = route?.params;

  const handleSelectedGrade = (item: any) => {
    setSelectedGrade(item);
    setGrade(false);
  };

  const handleGrade = () => {
    setGrade(true);
  };
  const dispatch = useDispatch<any>();
  const handleRegistration = (val: any) => {
    userData = {...userData, grade: isSelectedGrade, degree: val?.degree};

    if (edit) {
      navigation.navigate('UserStack', {
        screen: 'EditProfile',
        params: {
          userData,
        },
      });
    } else {
      const formData = new FormData();
      formData.append('firstName', userData.name);
      formData.append('lastName', userData.surName);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('intSchoolId', userData.schoolId);
      formData.append('grade', userData.grade);
      formData.append('photo', {
        uri: userData?.photo?.path,
        type: userData?.photo?.mime,
        name:
          'profile_' +
          randomNameGenerator() +
          '.' +
          userData?.mime.split('/')[1],
      });
      formData.append('degree', userData.degree);
      formData.append('insta', userData.insta);

      dispatch(register(formData)).then((response: any) => {
        console.log('resppp', response.payload);
        if (response.payload !== undefined) {
          navigation.navigate('VerifyEmail', {
            userData,
          });
        }
      });
    }
  };
  return (
    <View style={styles.constainer}>
      {!isLoading ? (
        <View>
          <View style={styles.headerView}>
            <Header logo backArrow />
          </View>

          <View style={styles.formikContainer}>
            <Formik
              initialValues={degreeInitialValue}
              onSubmit={handleRegistration}
              validationSchema={degreeValidation}>
              {({handleSubmit, handleChange, values, errors, touched}) => (
                <>
                  <Input
                    label={t('Degree program')}
                    field
                    value={values.degree}
                    onChangeText={handleChange('degree')}
                    // keyboardType={'numeric'}
                  />

                  {touched.degree && errors.degree ? (
                    <Text style={styles.error}>{errors.degree}</Text>
                  ) : null}

                  <View style={styles.btnView}>
                    {grade ? (
                      <DropDownSearch
                        data={gradeArr}
                        onSelect={handleSelectedGrade}
                        placeholder={'Search for a grade'}
                      />
                    ) : (
                      <Button
                        label={isSelectedGrade ? isSelectedGrade : t('Grade')}
                        bgColor={
                          isSelectedGrade ? Theme.primary : Theme.buttonColor
                        }
                        marginVertical={20}
                        fontSize={fontPixel(21.355)}
                        color={isSelectedGrade ? Theme.white : Theme.primary}
                        onPress={() => handleGrade()}
                      />
                    )}
                  </View>

                  {isSelectedGrade && (
                    <Button
                      label={t('Next')}
                      color={Theme.primary}
                      marginVertical={20}
                      onPress={handleSubmit}
                    />
                  )}
                </>
              )}
            </Formik>
          </View>
        </View>
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={Theme.primary} size={30} />
        </View>
      )}
    </View>
  );
};

export default SelectDegree;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  headerView: {
    height: heightPixel(200),
    justifyContent: 'flex-end',
  },
  btnView: {
    height: heightPixel(130),
    width: widthPixel(275),
    alignSelf: 'center',
    marginVertical: pixelSizeVertical(20),
    bottom: 10,
  },
  error: {
    color: Theme.errorColor,
    padding: 5,
    fontSize: 14,
    marginTop: 1,
    marginBottom: 5,
    marginLeft: '4%',
  },
  formikContainer: {
    bottom: 10,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
