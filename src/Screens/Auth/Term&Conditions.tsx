import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

import Theme from '../../Utils/Theme';
import Header from '../../Components/Header/Header';
import Button from '../../Components/Button/Button';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import ScrollBox from '../../Components/ScrollBox/ScrollBox';
import {conditions, termsData} from '../../Utils/Json';
import Images from '../../Utils/Images';
const TermConditions = ({navigation, route}: any) => {
  const {t} = useTranslation('conditon');
  const [isSelected, setIsSelected] = useState<any>(conditions);
  const [isScrollEnd, setScrollEnd] = useState(false);
  const {userData} = route?.params;

  const listHeader = () => {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://bookstreet.it/privacyeng')}>
          <Text style={styles.link}>{t('privacy')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://bookstreet.it/eula')}>
          <Text style={styles.link}>{t('eula')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function handlePrivacy(e: any) {
    setIsSelected((prevData: any) =>
      prevData.map((item: any) =>
        item.id === e.id ? {...item, selected: !item.selected} : item,
      ),
    );
  }

  function isSameAnswer(el: any, index: any, arr: any) {
    if (index === 0) {
      return true;
    } else {
      return el.selected === arr[index - 1].selected;
    }
  }
  return (
    <View style={styles.constainer}>
      <Header backArrow />

      <Text style={styles.headerTxt}>{t('title')}</Text>

      <ScrollBox label={termsData} onSelect={(i: boolean) => setScrollEnd(i)} />
      <Text style={styles.txt}>{t('des')}</Text>
      <View>
        <FlatList
          ListHeaderComponent={listHeader}
          data={isSelected}
          keyExtractor={(val: any) => val.id}
          renderItem={({item}) => (
            <View style={styles.privacyRow}>
              <TouchableOpacity
                disabled={isScrollEnd ? false : true}
                style={[
                  styles.checkBox,
                  {
                    borderColor: isSelected.selected
                      ? Theme.primary
                      : Theme.grey,
                  },
                ]}
                onPress={() => handlePrivacy(item)}>
                {item.selected && <Image source={Images.check} />}
              </TouchableOpacity>
              <Text style={styles.privacyTxt}>{t(item.title)}</Text>
            </View>
          )}
        />
      </View>

      <Button
        label={'Next'}
        marginVertical={20}
        onPress={() =>
          navigation.navigate('WelcomeScreen', {
            userData,
          })
        }
        color={Theme.primary}
        disabled={isSelected.every(isSameAnswer) ? false : true}
      />
    </View>
  );
};

export default TermConditions;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  headerTxt: {
    color: Theme.primary,
    fontSize: fontPixel(23.782),
    textAlign: 'center',
  },
  txt: {
    fontSize: fontPixel(14.719),
    fontWeight: '400',
    color: Theme.grey,
    textAlign: 'center',
    bottom: 3,
  },
  link: {
    color: Theme.primary,
    fontWeight: '400',
    fontSize: fontPixel(13.92),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPixel(300),
    alignSelf: 'center',
    marginVertical: pixelSizeVertical(30),
  },
  checkBox: {
    height: heightPixel(19),
    width: widthPixel(19),
    borderColor: Theme.grey,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  privacyRow: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    width: widthPixel(300),
    alignSelf: 'center',
    marginVertical: pixelSizeVertical(15),
  },
  privacyTxt: {
    color: Theme.grey,
    fontWeight: '400',
    fontSize: fontPixel(14.719),
    marginLeft: 10,
  },
});
