import React from 'react';
import {View, StyleSheet} from 'react-native';
import Theme from '../../Utils/Theme';
import {fontPixel, pixelSizeVertical} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';

import CustomText from '../../Components/CustomTxt/CustomTxt';

import Button from '../../Components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SuccessfullyMessage = ({navigation, route}: any) => {
  const {t} = useTranslation('settings');
  const {credentials} = route.params;

  const handleChanges = () => {
    AsyncStorage.clear();
    navigation.dispatch('AuthStack');
    // navigation.navigate('AuthStack')
    // navigation.navigate('AuthStack');
  };

  return (
    <View style={styles.container}>
      <CustomText
        customStyles={styles.txt}
        label={credentials ? t('credentialChanged') : t('accountDeleted')}
      />
      <Button
        color={Theme.grey}
        label={t('end')}
        marginVertical={pixelSizeVertical(230)}
        onPress={() => handleChanges()}
      />
    </View>
  );
};

export default SuccessfullyMessage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
    justifyContent: 'center',
  },

  txt: {
    color: Theme.grey,
    fontSize: fontPixel(24.084),
    fontWeight: '400',
    // marginTop: '30%',
    marginVertical: pixelSizeVertical(170),
  },
});
