import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Theme from '../../../Utils/Theme';
import Header from '../../../Components/Header/Header';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/Button/Button';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {
  emailSelectionInitialValues,
  emailValidation,
} from '../../../Utils/validation';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPass} from '../../../Redux/Reducers/Authentication/ForgotSlice';
import Loader from '../../../Components/Loader/Loader';
const EmailField = ({navigation}: any) => {
  const {isLoading} = useSelector((state: any) => state.resetPassword);

  const {t} = useTranslation('emailSelection');

  const dispath = useDispatch<any>();
  function handleEmailSection(val: any) {
    const body = {
      email: val?.email,
    };
    dispath(forgotPass(body)).then((res: any) => {
      if (res?.payload !== undefined) {
        navigation.navigate('ResetPass', {
          email: val?.email,
        });
      }
    });
  }
  return (
    <View style={styles.constainer}>
      {isLoading ? (
        <Loader color={Theme.primary} />
      ) : (
        <View>
          <Header backArrow />

          <View style={styles.fieldContainer}>
            <Formik
              initialValues={emailSelectionInitialValues}
              onSubmit={handleEmailSection}
              validationSchema={emailValidation}>
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

                  <Button
                    label={t('Next')}
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

export default EmailField;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
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
