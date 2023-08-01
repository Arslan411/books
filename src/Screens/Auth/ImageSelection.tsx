/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import Theme from '../../Utils/Theme';
import Header from '../../Components/Header/Header';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import {imgSelection} from '../../Utils/Json';
import Button from '../../Components/Button/Button';
import ImagePicker from 'react-native-image-crop-picker';
import {useTranslation} from 'react-i18next';
import Images from '../../Utils/Images';
import Imag from '../../Assets/Images/profile1.png';

const ImageSelection = ({navigation, route}: any) => {
  const [selectedImg, setSelectedImg] = useState<any>();
  const [profile, setProfile] = useState<any>();
  const {t} = useTranslation('imageSelection');
  const {formValues} = route?.params;
  let registerData = {
    ...formValues,
    photo: selectedImg ? selectedImg : profile ? profile : '',
  };

  function handleImagePicker(item: any) {
    if (item.id === 2) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
      }).then(image => {
        setSelectedImg(image);
        setProfile('');
      });
    } else {
      setProfile(item.img);
      setSelectedImg({
        path: Image.resolveAssetSource(item.img)?.uri.split('?')[0],
        mime: 'png',
        default: true,
      });
    }
  }

  return (
    <View style={styles.constainer}>
      <Header logo backArrow />

      <View style={styles.innerContainer}>
        <Text style={styles.txt}>{t('headerTxt')}</Text>
        <View style={styles.row}>
          {imgSelection.map((item: any) => (
            <View style={styles.pickerView}>
              <TouchableOpacity onPress={() => handleImagePicker(item)}>
                {item.id === 2 ? (
                  <Image
                    style={styles.img}
                    source={
                      selectedImg && !selectedImg?.default
                        ? {uri: selectedImg?.path}
                        : item.img
                    }
                  />
                ) : (
                  <Image
                    style={[
                      styles.img,
                      {
                        borderColor:
                          profile === item.img ? Theme.primary : 'transparent',
                      },
                    ]}
                    source={item.img}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.txt}>{t(item.label)}</Text>
            </View>
          ))}
        </View>
        <View style={styles.btnView}>
          <Button
            label={t('next')}
            onPress={() => {
              console.log('registerData', registerData);
              navigation.navigate('SelectInsitute', {
                registerData,
              });
            }}
            color={Theme.primary}
          />
        </View>
      </View>
    </View>
  );
};

export default ImageSelection;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  txt: {
    color: Theme.primary,
    fontSize: fontPixel(17.296),
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: pixelSizeVertical(5),
  },
  pickerView: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: widthPixel(320),
    alignItems: 'center',
    alignSelf: 'center',
    height: heightPixel(170),
  },
  img: {
    borderRadius: 10,
    height: 80,
    width: 80,
    borderWidth: 2,
  },
  innerContainer: {
    marginTop: 20,
  },
  btnView: {
    height: heightPixel(180),
    justifyContent: 'flex-end',
  },
});
