/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import Theme from '../../Utils/Theme';

import {fontPixel, pixelSizeVertical} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';
import {settings} from '../../Utils/Json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation}: any) => {
  const {t} = useTranslation('settings');
  let lastElement = settings[settings.length - 1];

  function handleRoute(e: any) {
    console.log(e);
    if (e.route === 'Instructions') {
      navigation.navigate(e.route, {title: e.title});
    } else if (e.title === 'logOut') {
      console.log('ok');
      AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{name: e.route}],
      });
    } else {
      navigation.navigate(e.route);
    }
  }
  return (
    <View style={styles.container}>
      <Header
        backArrow
        label={'Settings'}
        fontSize={fontPixel(24.084)}
        fontWeight={'bold'}
      />

      <View style={styles.btnContainer}>
        {settings.map(item => (
          <TouchableOpacity onPress={() => handleRoute(item)}>
            <Text
              style={[
                styles.btnTxt,
                {
                  color:
                    lastElement.title === item.title ? '#C35151' : Theme.grey,
                  fontWeight: lastElement.title === item.title ? '600' : '400',
                  marginTop: lastElement.title === item.title ? 12 : 7,
                },
              ]}>
              {t(item.title)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Settings;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },

  btnTxt: {
    color: Theme.grey,
    fontSize: fontPixel(24.084),
    textAlign: 'justify',
    marginVertical: pixelSizeVertical(7.5),
    fontWeight: '400',
  },
  btnContainer: {
    marginLeft: '5%',
    marginTop: 13,
  },
});
