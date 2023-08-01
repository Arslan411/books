import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Theme from '../../../Utils/Theme';
import Header from '../../../Components/Header/Header';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/Button/Button';
import {Formik} from 'formik';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
} from '../../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import {
  resetPassInitialValues,
  resetPassValidation,
} from '../../../Utils/validation';
import {useDispatch, useSelector} from 'react-redux';
import {resetPass} from '../../../Redux/Reducers/Authentication/ForgotSlice';
import Loader from '../../../Components/Loader/Loader';
const ResetPass = ({navigation, route}: any) => {
  const {isLoading} = useSelector((state: any) => state.resetPassword);
  const {t} = useTranslation('resetPass');
  const dispatch = useDispatch<any>();
  const {email} = route.params;

  function handleResetPass(val: any) {
    const body = {
      email: email,
      password: val?.password,
      otp: val?.code,
    };

    dispatch(resetPass(body)).then((res: any) => {
      if (res?.payload !== undefined) {
        navigation.navigate('Login');
      }
    });
  }
  return (
    <View style={styles.constainer}>
      {isLoading ? (
        <Loader color={Theme.primary} />
      ) : (
        <View>
          <Header backArrow label={t('headerTxt')} />

          <View style={styles.fieldContainer}>
            <Formik
              initialValues={resetPassInitialValues}
              onSubmit={handleResetPass}
              validationSchema={resetPassValidation}>
              {({handleSubmit, handleChange, values, errors, touched}) => (
                <>
                  <Input
                    label={t('code')}
                    field
                    value={values.code}
                    onChangeText={handleChange('code')}
                  />

                  {touched.code && errors.code ? (
                    <Text style={styles.error}>{errors.code}</Text>
                  ) : null}

                  <Input
                    label={t('password')}
                    field
                    value={values.password}
                    onChangeText={handleChange('password')}
                    secureTextEntry
                  />

                  {touched.password && errors.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : null}

                  <Input
                    label={t('repeatPass')}
                    field
                    value={values.repeatPass}
                    onChangeText={handleChange('repeatPass')}
                    secureTextEntry
                  />

                  {touched.repeatPass && errors.repeatPass ? (
                    <Text style={styles.error}>{errors.repeatPass}</Text>
                  ) : null}

                  <Button
                    label={t('confirm')}
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

export default ResetPass;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  headerView: {
    height: heightPixel(200),
    justifyContent: 'flex-end',
  },
  accountTxt: {
    color: Theme.grey,
    fontWeight: '400',
    fontSize: fontPixel(16.038),
    textAlign: 'center',
  },
  btnView: {
    height: heightPixel(200),
    justifyContent: 'flex-end',
  },
  txtView: {
    marginVertical: pixelSizeVertical(30),
  },
  error: {
    color: Theme.errorColor,
    padding: 5,
    fontSize: 14,
    marginTop: 1,
    marginBottom: 5,
    marginLeft: '4%',
  },
  fieldContainer: {
    marginTop: 28,
  },
});
