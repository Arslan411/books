import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';

import Theme from '../../Utils/Theme';

import {fontPixel, pixelSizeVertical} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';
import {language} from '../../Utils/Json';

const Language = () => {
  const {t} = useTranslation('settings');
  const [isSelected, setIsSelected] = useState('');

  return (
    <View style={styles.container}>
      <Header
        backArrow
        label={'Language'}
        fontSize={fontPixel(24.084)}
        fontWeight={'bold'}
      />
      <View style={styles.mapContainer}>
        {language.map(item => (
          <View>
            <TouchableOpacity
              style={styles.row}
              onPress={() => setIsSelected(item.title)}>
              <Image source={item.image} />
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      isSelected === item.title
                        ? Theme.darkPrimary
                        : Theme.grey,
                  },
                ]}>
                {t(item.title)}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Language;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  row: {
    flexDirection: 'row',
    marginLeft: '4%',
    marginVertical: pixelSizeVertical(20),
    alignItems: 'center',
  },
  checkBox: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: Theme.darkPrimary,
    borderWidth: 3,
  },
  title: {
    color: Theme.grey,
    fontSize: fontPixel(23.084),
    textAlign: 'justify',
    fontWeight: '400',
    lineHeight: 28,
    marginLeft: 10,
  },
  mapContainer: {
    marginTop: 20,
  },
});
