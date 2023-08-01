import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Theme from '../../../Utils/Theme';
import Header from '../../../Components/Header/Header';

import Button from '../../../Components/Button/Button';

import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
} from '../../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import {insitutes} from '../../../Utils/Json';

const SelectInsitute = ({navigation, route}: any) => {
  const {t} = useTranslation('institute');
  const {registerData, edit} = route?.params;

  const handleInsitute = (i: any) => {
    if (i.id === 1) {
      navigation.navigate('HighSchool', {
        registerData,
        edit,
      });
    } else {
      navigation.navigate('University', {
        registerData,
        edit,
      });
    }
  };

  return (
    <View style={styles.constainer}>
      <View style={styles.headerView}>
        <Header logo backArrow />
      </View>

      <View>
        <Text style={styles.txt}>{t('heading')}</Text>
        {insitutes.map(i => (
          <Button
            onPress={() => handleInsitute(i)}
            label={t(i.title)}
            bgColor={Theme.buttonColor}
            marginVertical={i.id === 1 ? 13 : 4}
            fontSize={fontPixel(21.355)}
            color={Theme.primary}
          />
        ))}
      </View>
    </View>
  );
};

export default SelectInsitute;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  headerView: {
    height: heightPixel(200),
    justifyContent: 'flex-end',
  },
  txt: {
    textAlign: 'center',
    color: Theme.grey,
    fontWeight: '400',
    fontSize: fontPixel(17.058),
    marginVertical: pixelSizeVertical(40),
    marginTop: 70,
  },
  schoolDetailedView: {
    marginVertical: pixelSizeVertical(45),
  },
});
