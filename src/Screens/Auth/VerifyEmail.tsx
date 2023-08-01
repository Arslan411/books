import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';

import Theme from '../../Utils/Theme';
import Header from '../../Components/Header/Header';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import {Formik} from 'formik';
import {fontPixel} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  verifyEmailInitialValue,
  verifyEmailValidation,
} from '../../Utils/validation';
import {userConfirmation} from '../../Redux/Reducers/Authentication/UserConfirmation';
const VerifyEmail = ({navigation, route}: any) => {
  const {isLoading} = useSelector((state: any) => state.varifyUser);
  const dispatch = useDispatch<any>();
  const {userData} = route.params;

  const {t} = useTranslation('verifyEmail');
  function hanleVerifyMail(val: any) {
    const body = {
      email: userData.email,
      otp: val.code,
    };
    dispatch(userConfirmation(body)).then((res: any) => {
      console.log('dddddd', res.payload);
      if (res.payload !== undefined) {
        navigation.navigate('TermConditions', {
          userData,
        });
      }
    });
  }

  return (
    <View style={styles.constainer}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={Theme.primary} size={30} />
        </View>
      ) : (
        <View>
          <Header logo backArrow />

          <View style={styles.formikContainer}>
            <Formik
              initialValues={verifyEmailInitialValue}
              onSubmit={hanleVerifyMail}
              validationSchema={verifyEmailValidation}>
              {({handleSubmit, handleChange, values, errors, touched}) => (
                <>
                  <Input
                    label={t('email')}
                    field
                    value={values.code}
                    onChangeText={handleChange('code')}
                  />

                  {touched.code && errors.code ? (
                    <Text style={styles.error}>{errors.code}</Text>
                  ) : null}
                  <Text style={styles.txt}>{t('description')}</Text>

                  <Button
                    label={t('next')}
                    marginVertical={40}
                    onPress={handleSubmit}
                    color={Theme.primary}
                  />
                </>
              )}
            </Formik>
          </View>
        </View>
      )}
    </View>
  );
};

export default VerifyEmail;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },

  formikContainer: {
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
  txt: {
    textAlign: 'center',
    fontSize: fontPixel(14.719),
    color: Theme.grey,
    alignSelf: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
