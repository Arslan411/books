import React from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import Theme from '../../Utils/Theme';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';
import Button from '../../Components/Button/Button';
import {Formik} from 'formik';
import {priceInitialValue, priceValidation} from '../../Utils/validation';
import CustomText from '../../Components/CustomTxt/CustomTxt';
import {useDispatch, useSelector} from 'react-redux';
import {addBook} from '../../Redux/Reducers/Proposals/InsertProposal';
import Loader from '../../Components/Loader/Loader';
import {
  findDacayUsageKeyByValue,
  randomNameGenerator,
} from '../../Utils/functions';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const BookPrice = ({navigation, route}: any) => {
  const {isLoading} = useSelector((state: any) => state.addProposal);

  const {t} = useTranslation('bookSell');
  const dispatch = useDispatch<any>();
  const {bookData} = route?.params;

  const fetchBlob = async file => {
    const localFile = await fetch(file);
    const fileBlob = await localFile.blob();

    return fileBlob;
  };

  function handlePrice(val: any) {
    const formData = new FormData();
    formData.append('isbn', bookData?.isbn);
    formData.append(
      'decay',
      findDacayUsageKeyByValue(bookData.condition, 'decay'),
    );
    formData.append(
      'usage',
      findDacayUsageKeyByValue(bookData.exercise, 'usage'),
    );
    formData.append('price', Number(val?.price));
    formData.append('photo1', {
      uri: bookData?.bookPhoto1.uri,
      type: bookData?.bookPhoto1.type,
      name:
        'imag_' +
        Math.random() * 100 +
        '.' +
        bookData?.bookPhoto1.type.split('/')[1],
    });
    formData.append('photo2', {
      uri: bookData?.bookPhoto2.uri,
      type: bookData?.bookPhoto2.type,
      name:
        'imag_' +
        randomNameGenerator() +
        '.' +
        bookData?.bookPhoto2.type.split('/')[1],
    });
    formData.append('note', 'text');

    dispatch(addBook(formData)).then(res => {
      console.log('as------>', res?.payload);
      if (res?.payload?.data?.proposalId) {
        Toast.show({
          type: 'success',
          text1: 'Proposal added successfully',
        });

        navigation.navigate('Bottom');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid ISBN',
        });
      }
    });
  }

  return (
    <ScrollView style={styles.constainer}>
      {isLoading ? (
        <Loader color={Theme.primary} />
      ) : (
        <View>
          <Header backArrow />

          <View style={styles.formikContainer}>
            <Formik
              initialValues={priceInitialValue}
              onSubmit={handlePrice}
              validationSchema={priceValidation}>
              {({handleSubmit, handleChange, values, errors, touched}) => (
                <>
                  <CustomText
                    label={t('priceTitle')}
                    customStyles={{marginTop: 27}}
                  />
                  <View style={styles.row}>
                    <Text style={styles.currency}>€</Text>
                    <TextInput
                      style={styles.input}
                      value={`${values.price}`}
                      onChangeText={handleChange('price')}
                      keyboardType="numeric"
                    />
                  </View>

                  {touched.price && errors.price && (
                    <Text style={styles.error}>{errors.price}</Text>
                  )}

                  <View style={styles.btnView}>
                    <Button
                      label={t('post')}
                      marginVertical={40}
                      onPress={handleSubmit}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default BookPrice;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  formikContainer: {
    marginVertical: pixelSizeVertical(50),
  },
  inputTitle: {
    color: Theme.darkPrimary,
    fontSize: fontPixel(19),
    top: 7,
    fontWeight: '600',
    borderBottomWidth: 1.5,
    width: widthPixel(200),
    borderBottomColor: Theme.darkPrimary,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    color: Theme.errorColor,
    padding: 5,
    fontSize: 14,
    marginTop: 1,
    marginBottom: 5,
    marginLeft: '38%',
  },
  btnView: {
    height: heightPixel(270),
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    width: widthPixel(90),
    alignItems: 'center',
    borderBottomColor: Theme.darkPrimary,
    alignSelf: 'center',
  },
  currency: {
    color: Theme.darkPrimary,
    fontSize: fontPixel(19),
    top: 7,
    fontWeight: '600',
  },
  input: {
    color: Theme.darkPrimary,
    fontSize: fontPixel(19),
    top: 7,
    fontWeight: '600',
  },
});
