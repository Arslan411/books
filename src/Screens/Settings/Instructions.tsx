import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
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
import ScrollBox from '../../Components/ScrollBox/ScrollBox';
import {eulaData, privacyData, termsData} from '../../Utils/Json';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';

const Instructions = ({route}: any) => {
  const {t} = useTranslation('settings');

  const {title} = route.params;
  console.log('title', title);

  function handleClipboard() {
    if (title === 'condition') {
      Clipboard.setString('https://bookstreet.it/termseng');
      Toast.show({
        type: 'success',
        text1: 'link copied',
      });
    } else if (title === 'privacy') {
      Clipboard.setString('https://bookstreet.it/privacyeng');
      Toast.show({
        type: 'success',
        text1: 'link copied',
      });
    } else {
      Clipboard.setString('https://bookstreet.it/eula');
      Toast.show({
        type: 'success',
        text1: 'link copied',
      });
    }
  }
  return (
    <View style={styles.container}>
      <Header
        backArrow
        label={t(title)}
        fontSize={fontPixel(24.084)}
        fontWeight={'bold'}
      />
      <ScrollBox
        height={heightPixel(520)}
        width={widthPixel(350)}
        onSelect={() => console.log()}
        label={
          title === 'condition'
            ? termsData
            : title === 'privacy'
            ? privacyData
            : eulaData
        }
      />

      <Button
        color={Theme.grey}
        fontSize={fontPixel(19.487)}
        label={t('downloadPdf')}
        marginVertical={pixelSizeVertical(20)}
        onPress={() => Alert.alert('Functionality under process!')}
      />
      <Button
        color={Theme.grey}
        fontSize={fontPixel(19.487)}
        label={t('copyLink')}
        onPress={() => handleClipboard()}
      />
    </View>
  );
};

export default Instructions;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
});
