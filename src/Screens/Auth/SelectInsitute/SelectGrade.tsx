import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import Theme from '../../../Utils/Theme';
import Header from '../../../Components/Header/Header';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../../../Components/Button/Button';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
} from '../../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import DropDownSearch from '../../../Components/Search/DropdownSearch';
import {register} from '../../../Redux/Reducers/Authentication/AuthReducer';
import {randomNameGenerator} from '../../../Utils/functions';

const SelectGrade = ({navigation, route}: any) => {
  const {isLoading} = useSelector((state: any) => state.auth);
  const [isSelectedGrade, setSelectedGrade] = useState('');
  const [grade, setGrade] = useState(false);

  const dispatch = useDispatch<any>();
  const gradeArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const sectionData = ['a', 'b', 'c', 'd', 'e', 'f'];

  const [isSelectedSection, setSelectedSection] = useState('');
  const [section, setSection] = useState(false);

  const {t} = useTranslation('institute');

  var {userData, edit} = route?.params;
  userData = {...userData, grade: isSelectedGrade, section: isSelectedSection};

  const handleSelectedGrade = (item: any) => {
    setSelectedGrade(item);
    setGrade(false);
  };

  const handleGrade = () => {
    setGrade(true);
  };

  const handleSelectedSection = (item: any) => {
    setSelectedSection(item);
    setSection(false);
  };

  const handleSection = () => {
    setSection(true);
  };

  console.log('userData', userData);

  function handleRegistration() {
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
      formData.append('section', userData.section);
      formData.append('photo', {
        uri: userData?.photo?.path,
        type: userData?.photo?.mime,
        name:
          'profile_' +
          randomNameGenerator() +
          '.' +
          userData?.photo?.mime.split('/')[1],
      });

      dispatch(register(formData)).then((response: any) => {
        if (response.payload !== undefined) {
          navigation.navigate('VerifyEmail', {
            userData,
          });
        }
      });
    }
  }
  return (
    <View style={styles.constainer}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={Theme.primary} size={30} />
        </View>
      ) : (
        <View>
          <View style={styles.headerView}>
            <Header logo backArrow />
          </View>

          <View style={styles.btnView}>
            {grade ? (
              <View style={styles.searchList}>
                <DropDownSearch
                  data={gradeArr}
                  onSelect={handleSelectedGrade}
                  placeholder={'Search for a grade'}
                />
              </View>
            ) : (
              <Button
                label={isSelectedGrade ? isSelectedGrade : t('Grade')}
                bgColor={isSelectedGrade ? Theme.primary : Theme.buttonColor}
                marginVertical={20}
                fontSize={fontPixel(21.355)}
                color={isSelectedGrade ? Theme.white : Theme.primary}
                onPress={() => handleGrade()}
                disabled={!section ? false : true}
              />
            )}

            {section ? (
              <View style={styles.searchList}>
                <DropDownSearch
                  data={sectionData}
                  onSelect={handleSelectedSection}
                  placeholder={'Select University'}
                />
              </View>
            ) : (
              <Button
                label={isSelectedSection ? isSelectedSection : t('Section')}
                bgColor={isSelectedSection ? Theme.primary : Theme.buttonColor}
                marginVertical={20}
                fontSize={fontPixel(21.355)}
                color={isSelectedSection ? Theme.white : Theme.primary}
                onPress={() => handleSection()}
                disabled={!grade ? false : true}
              />
            )}
          </View>
          {isSelectedGrade && isSelectedSection ? (
            <Button
              label={t('Next')}
              color={Theme.primary}
              marginVertical={pixelSizeHorizontal(50)}
              onPress={() => handleRegistration()}
              // onPress={() => navigation.navigate('VerifyEmail')}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

export default SelectGrade;
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
    height: heightPixel(290),
    justifyContent: 'center',
  },
  searchList: {
    height: 100,
    width: 275,
    alignSelf: 'center',
    marginVertical: pixelSizeHorizontal(30),
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
