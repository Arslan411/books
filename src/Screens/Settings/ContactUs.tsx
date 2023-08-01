import React from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Theme from '../../Utils/Theme';
import {
  fontPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';
import CustomText from '../../Components/CustomTxt/CustomTxt';
import {contactArr} from '../../Utils/Json';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';

const ContactUs = () => {
  const {t} = useTranslation('settings');

  function handleCopy(res: any) {
    console.log(res?.contact);
    if (res?.contact === 'info@bookstreet.it') {
      Clipboard.setString('info@bookstreet.it');
      Toast.show({
        type: 'success',
        text1: 'Copied!',
      });
    } else {
      Clipboard.setString('support@bookstreet.it');
      Toast.show({
        type: 'success',
        text1: 'Copied!',
      });
    }
  }
  return (
    <View style={styles.container}>
      <Header
        backArrow
        label={t('contact')}
        fontSize={fontPixel(24.084)}
        fontWeight={'bold'}
      />

      {contactArr.map(res => (
        <View style={styles.innerContainer}>
          <CustomText customStyles={styles.txt} label={t(res.title)} />
          <CustomText customStyles={styles.txt} label={res.contact} />
          <TouchableOpacity style={styles.btn} onPress={() => handleCopy(res)}>
            <CustomText customStyles={styles.btnLabel} label={t('copy')} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ContactUs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  innerContainer: {
    marginVertical: 20,
    marginLeft: '5%',
  },

  txt: {
    color: Theme.grey,
    fontSize: fontPixel(24.0843),
    fontWeight: '400',
    textAlign: 'justify',
    marginVertical: pixelSizeVertical(1),
  },
  btnLabel: {
    color: Theme.grey,
    textAlign: 'justify',
    marginVertical: pixelSizeVertical(10),
    fontWeight: '700',
  },
  btn: {
    width: widthPixel(80),
  },
});
