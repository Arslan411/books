import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Theme from '../../Utils/Theme';
import {fontPixel, pixelSizeVertical} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';
import CustomText from '../../Components/CustomTxt/CustomTxt';
import {Formik} from 'formik';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import {
  changeCredentialsValidation,
  loginInitialValues,
  loginValidation,
} from '../../Utils/validation';
import {useDispatch, useSelector} from 'react-redux';
import {
  authChange,
  authCredentials,
} from '../../Redux/Reducers/Authentication/CredentialChange';
import Loader from '../../Components/Loader/Loader';

const ChangeEmailPassword = ({navigation}: any) => {
  const {isLoading} = useSelector((state: any) => state.authCredentials);
  const {t} = useTranslation('settings');
  const dispatch = useDispatch<any>();

  const [isLogin, setIsLogin] = useState(false);

  function handleSignIn(val: any) {
    const body = {
      email: val?.email,
      password: val?.password,
    };
    dispatch(authCredentials(body)).then((res: any) => {
      if (res?.payload?.data && !isLogin) {
        setIsLogin(true);
      }
    });
  }

  const handleChangeCredentials = (val: any) => {
    const body = {
      email: val?.newEmail,
      password: val?.newPassword,
      otp: val?.code,
    };
    dispatch(authChange(body)).then((res: any) => {
      if (res?.payload?.data) {
        navigation.navigate('VerificationCode', {
          credentials: true,
          email: val?.newEmail,
        });
      }
    });
  };

  const newCredentialValues = {
    code: '',
    newEmail: '',
    newPassword: '',
    repeatPass: '',
  };
  const handleBackPress = () => {
    if (isLogin) {
      setIsLogin(false);
    } else {
      navigation.goBack();
    }
  };
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <Loader color={Theme.primary} />
      ) : (
        <View>
          <Header
            backArrow
            label={t('changeEmail')}
            fontSize={fontPixel(24.084)}
            fontWeight={'bold'}
            onPress={() => handleBackPress()}
          />
          <CustomText
            customStyles={styles.title}
            label={!isLogin ? t('loginAgain') : t('sentCredentialsTitle')}
          />
          {!isLogin ? (
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
                      labelColor={Theme.grey}
                      value={values.email}
                      onChangeText={handleChange('email')}
                    />

                    {touched.email && errors.email ? (
                      <Text style={styles.error}>{errors.email}</Text>
                    ) : null}

                    <Input
                      label={t('password')}
                      labelColor={Theme.grey}
                      field
                      value={values.password}
                      onChangeText={handleChange('password')}
                      secureTextEntry
                    />

                    {touched.password && errors.password ? (
                      <Text style={styles.error}>{errors.password}</Text>
                    ) : null}

                    <Button
                      label={t('login')}
                      marginVertical={pixelSizeVertical(200)}
                      onPress={handleSubmit}
                      color={Theme.grey}
                    />
                  </>
                )}
              </Formik>
            </View>
          ) : (
            <View>
              <Formik
                initialValues={newCredentialValues}
                onSubmit={handleChangeCredentials}
                validationSchema={changeCredentialsValidation}>
                {({handleSubmit, handleChange, values, errors, touched}) => (
                  <>
                    <Input
                      label={t('code')}
                      field
                      labelColor={Theme.grey}
                      value={values.code}
                      onChangeText={handleChange('code')}
                    />

                    {touched.code && errors.code ? (
                      <Text style={styles.error}>{errors.code}</Text>
                    ) : null}

                    <Input
                      label={t('newEmail')}
                      field
                      labelColor={Theme.grey}
                      value={values.newEmail}
                      onChangeText={handleChange('newEmail')}
                    />

                    {touched.newEmail && errors.newEmail ? (
                      <Text style={styles.error}>{errors.newEmail}</Text>
                    ) : null}

                    <Input
                      label={t('newPassword')}
                      labelColor={Theme.grey}
                      field
                      value={values.newPassword}
                      onChangeText={handleChange('newPassword')}
                      secureTextEntry
                    />

                    {touched.newPassword && errors.newPassword ? (
                      <Text style={styles.error}>{errors.newPassword}</Text>
                    ) : null}

                    <Input
                      label={t('repeatPassword')}
                      labelColor={Theme.grey}
                      field
                      value={values.repeatPass}
                      onChangeText={handleChange('repeatPass')}
                      secureTextEntry
                    />

                    {touched.repeatPass && errors.repeatPass ? (
                      <Text style={styles.error}>{errors.repeatPass}</Text>
                    ) : null}

                    <Button
                      label={t('next')}
                      marginVertical={pixelSizeVertical(20)}
                      onPress={handleSubmit}
                      color={Theme.grey}
                    />
                  </>
                )}
              </Formik>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default ChangeEmailPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  title: {
    color: Theme.grey,
    fontWeight: '400',
    marginTop: 7,
    lineHeight: 29,
    fontSize: fontPixel(24.084),
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
