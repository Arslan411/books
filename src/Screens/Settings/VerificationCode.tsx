import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Theme from '../../Utils/Theme';
import {fontPixel, heightPixel} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';
import CustomText from '../../Components/CustomTxt/CustomTxt';
import {Formik} from 'formik';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import {
  verifyEmailValidation,
  verifyEmailInitialValue,
} from '../../Utils/validation';
import {useDispatch} from 'react-redux';
// import {userVerification} from '../../Redux/Reducers/DeleteAccount/AccountDeleteSlice';
import {userConfirmation} from '../../Redux/Reducers/Authentication/UserConfirmation';

const VerificationCode = ({navigation, route}: any) => {
  const dispatch = useDispatch<any>();
  const {t} = useTranslation('settings');
  const {credentials, email} = route.params;

  function handleConfirmation(val: any) {
    if (credentials) {
      const body = {
        email: email,
        otp: val?.code,
      };
      dispatch(userConfirmation(body)).then((res: any) => {
        if (res?.payload?.data) {
          navigation.navigate('SuccessfullyMessage', {credentials: true});
        }
      });
    } else {
      // const body = {
      //   email: 'john.doe@bookstreet.it',
      //   otp: 'RO55D67',
      // };

      // dispatch(userVerification(body));
      navigation.navigate('SuccessfullyMessage', {credentials: false});
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Header
        backArrow
        label={credentials ? t('changeEmail') : t('deleteAccount')}
        fontSize={fontPixel(24.084)}
        fontWeight={'bold'}
      />

      <View>
        <Formik
          initialValues={verifyEmailInitialValue}
          onSubmit={handleConfirmation}
          validationSchema={verifyEmailValidation}>
          {({handleSubmit, handleChange, values, errors, touched}) => (
            <>
              <View style={styles.innerContainer}>
                <Input
                  label={credentials ? t('verificationCode') : t('code')}
                  field
                  labelColor={Theme.grey}
                  value={values.code}
                  onChangeText={handleChange('code')}
                  fontSize={fontPixel(24)}
                  keyboardType={'numeric'}
                />

                {touched.code && errors.code ? (
                  <Text style={styles.error}>{errors.code}</Text>
                ) : null}
                <CustomText
                  customStyles={styles.txt}
                  label={
                    credentials ? t('saveChangesTxt') : t('deleteAccountTxt')
                  }
                />
              </View>

              <Button
                label={credentials ? t('confirm') : t('deleteAccount')}
                // marginVertical={pixelSizeVertical(400)}
                onPress={handleSubmit}
                color={Theme.grey}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default VerificationCode;
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
  txt: {
    color: Theme.grey,
    fontSize: fontPixel(14.719),
    fontWeight: '400',
  },
  innerContainer: {height: heightPixel(500)},
});
