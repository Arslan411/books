import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';

import Theme from '../../Utils/Theme';
import Header from '../../Components/Header/Header';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import {Formik} from 'formik';
import {fontPixel} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import {
  registerInitialValues,
  registerValidation,
} from '../../Utils/validation';
const Register = ({navigation}: any) => {
  const {t} = useTranslation('register');

  function handleSignUp(values: any) {
    navigation.navigate('ImageSelection', {
      formValues: values,
    });
  }
  return (
    <ScrollView style={styles.constainer}>
      <Header logo backArrow />

      <View style={styles.formikContainer}>
        <Formik
          initialValues={registerInitialValues}
          onSubmit={handleSignUp}
          validationSchema={registerValidation}>
          {({handleSubmit, handleChange, values, errors, touched}) => (
            <>
              <Input
                label={t('Name')}
                field
                value={values.name}
                onChangeText={handleChange('name')}
              />

              {touched.name && errors.name ? (
                <Text style={styles.error}>{errors.name}</Text>
              ) : null}

              <Input
                label={t('surName')}
                field
                value={values.surName}
                onChangeText={handleChange('surName')}
              />

              {touched.surName && errors.surName ? (
                <Text style={styles.error}>{errors.surName}</Text>
              ) : null}

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
                field
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry
              />

              {touched.password && errors.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}

              <Input
                label={t('repeat')}
                field
                value={values.confirmPass}
                onChangeText={handleChange('confirmPass')}
                secureTextEntry
              />

              {touched.confirmPass && errors.confirmPass ? (
                <Text style={styles.error}>{errors.confirmPass}</Text>
              ) : null}

              <Input
                label={t('insta')}
                field
                value={values.insta}
                onChangeText={handleChange('insta')}
              />

              <Button
                label={t('next')}
                marginVertical={20}
                onPress={handleSubmit}
                color={Theme.primary}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Register;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  accountTxt: {
    color: Theme.grey,
    fontWeight: '400',
    fontSize: fontPixel(16.038),
    textAlign: 'center',
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
});
