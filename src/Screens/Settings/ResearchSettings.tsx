import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import Theme from '../../Utils/Theme';

import {fontPixel, pixelSizeVertical} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';
import {research} from '../../Utils/Json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResearchSettings = () => {
  const {t} = useTranslation('settings');
  const [isSelected, setIsSelected] = useState('researchOption');

  const fetchData = async () => {
    const adds = await AsyncStorage.getItem('showAdds');
    const val = JSON.parse(adds);
    setIsSelected(!val ? 'researchOption1' : 'researchOption');
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleResearch(item: any) {
    setIsSelected(item.title);

    if (item.id === 2) {
      AsyncStorage.setItem('showAdds', JSON.stringify(false));
    } else {
      AsyncStorage.setItem('showAdds', JSON.stringify(true));
    }
  }

  return (
    <View style={styles.container}>
      <Header
        backArrow
        label={'Research settings'}
        fontSize={fontPixel(24.084)}
        fontWeight={'bold'}
      />
      <View style={styles.mapContainer}>
        {research.map(item => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => handleResearch(item)}>
            <View
              style={[
                styles.checkBox,
                {
                  backgroundColor:
                    isSelected === item.title ? Theme.darkPrimary : Theme.white,
                  borderColor:
                    isSelected === item.title ? Theme.darkPrimary : Theme.grey,
                },
              ]}
            />
            <Text
              style={[
                styles.title,
                {
                  color:
                    isSelected === item.title ? Theme.darkPrimary : Theme.grey,
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

export default ResearchSettings;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  row: {
    flexDirection: 'row',
    marginLeft: '4%',
    // marginTop: 20,
    marginVertical: pixelSizeVertical(20),
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
