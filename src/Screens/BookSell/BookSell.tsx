import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';

import Theme from '../../Utils/Theme';

import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import {Formik} from 'formik';
import {
  verifyEmailInitialValue,
  verifyEmailValidation,
} from '../../Utils/validation';
import CustomText from '../../Components/CustomTxt/CustomTxt';
import {useDispatch} from 'react-redux';
import {bookValidation} from '../../Redux/Reducers/Proposals/InsertProposal';

const BooksSell = ({navigation}: any) => {
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch<any>();
  const {t} = useTranslation('bookSell');
  function hanleIsbnCode(val: any) {
    const body = {
      isbn: val?.code,
    };
    dispatch(bookValidation(body)).then((res: any) => {
      if (res?.payload?.data) {
        setIsValid(false);
        navigation.navigate('BookCondition', {
          isbn: val?.code,
        });
      } else {
        setIsValid(true);
      }
    });
  }

  return (
    <ScrollView style={styles.constainer}>
      <Header backArrow />

      <View style={styles.formikContainer}>
        <Formik
          initialValues={verifyEmailInitialValue}
          onSubmit={hanleIsbnCode}
          validationSchema={verifyEmailValidation}>
          {({handleSubmit, handleChange, values, errors, touched}) => (
            <>
              <Input
                field
                value={values.code}
                onChangeText={handleChange('code')}
                keyboardType="numeric"
                width={widthPixel(291)}
                borderBottomColor={Theme.darkPrimary}
              />

              {touched.code && errors.code ? (
                <Text style={styles.error}>{errors.code}</Text>
              ) : isValid ? (
                <Text style={styles.error}>Invalid ISBN</Text>
              ) : null}
              <CustomText customStyles={styles.txt} label={t('isbn')} />

              <CustomText
                customStyles={styles.exampleTxt}
                label={t('example') + ': ' + '9788827453159'}
              />

              <View style={styles.btnView}>
                <Button
                  label={'Next'}
                  marginVertical={40}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default BooksSell;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  formikContainer: {
    marginVertical: pixelSizeVertical(50),
  },

  error: {
    color: Theme.errorColor,
    padding: 5,
    fontSize: 14,
    marginTop: 1,
    marginBottom: 5,
    marginLeft: '14%',
  },
  txt: {
    marginVertical: pixelSizeVertical(25),
  },

  exampleTxt: {
    textAlign: 'center',
    fontSize: fontPixel(14.719),
    color: Theme.grey,
    alignSelf: 'center',
  },
  btnView: {
    height: heightPixel(400),
    justifyContent: 'flex-end',
  },
});
