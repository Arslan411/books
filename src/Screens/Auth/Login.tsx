import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Theme from '../../Utils/Theme';
import Header from '../../Components/Header/Header';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import {loginInitialValues, loginValidation} from '../../Utils/validation';
import {login} from '../../Redux/Reducers/Authentication/AuthReducer';
import Loader from '../../Components/Loader/Loader';
import {profileData} from '../../Redux/Reducers/User/ProfileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Login = ({navigation}: any) => {
  const {isLoading} = useSelector((state: any) => state.auth);

  const {t} = useTranslation('login');

  const dispatch = useDispatch<any>();

  function handleSignIn(val: any) {
    const body = {
      email: val.email,
      password: val.password,
    };
    dispatch(login(body)).then((res: any) => {
      if (res.payload?.data.token) {
        dispatch(profileData()).then((profile: any) => {
          AsyncStorage.setItem(
            'userData',
            JSON.stringify(profile?.payload?.data),
          );
        });
        setTimeout(() => {
          navigation.navigate('UserStack', {
            screens: 'Bottom',
          });
          Toast.show({
            type: 'success',
            text1: 'Welcome',
          });
        }, 500);
      }
    });
  }
  return (
    <View style={styles.constainer}>
      {isLoading ? (
        <Loader color={Theme.primary} />
      ) : (
        <View>
          <View style={styles.headerView}>
            <Header logo />
          </View>

          <View>
            <Formik
              initialValues={loginInitialValues}
              onSubmit={handleSignIn}
              validationSchema={loginValidation}>
              {({handleSubmit, handleChange, values, errors, touched}) => (
                <>
                  <Input
                    label={t('email')}
                    field
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />

                  {touched.email && errors.email ? (
                    <Text style={styles.error}>{errors.email}</Text>
                  ) : null}

                  <Input
                    label={t('password')}
                    forgot={t('forgot')}
                    field
                    value={values.password}
                    onChangeText={handleChange('password')}
                    secureTextEntry
                    onPress={() => navigation.navigate('EmailSection')}
                  />

                  {touched.password && errors.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : null}

                  <Button
                    label={t('login')}
                    marginVertical={20}
                    onPress={handleSubmit}
                    color={Theme.primary}
                  />
                </>
              )}
            </Formik>
          </View>

          <View style={styles.btnView}>
            <Text style={styles.accountTxt}>{t('notRegistered')}</Text>
            <Button
              label={t('register')}
              onPress={() => navigation.navigate('Register')}
              color={Theme.primary}
            />
          </View>

          <View style={styles.txtView}>
            <Input
              forgot={t('look')}
              onPress={() => navigation.navigate('HaveLook')}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Login;
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
});
