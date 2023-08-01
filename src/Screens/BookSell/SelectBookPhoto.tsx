import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Theme from '../../Utils/Theme';

import {heightPixel, pixelSizeVertical} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';

import Button from '../../Components/Button/Button';

import CustomText from '../../Components/CustomTxt/CustomTxt';
// import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Images from '../../Utils/Images';

const BookPhoto = ({navigation, route}: any) => {
  const {t} = useTranslation('bookSell');

  var {bookData} = route?.params;
  const [isSelectedImages, setSelectedImages] = useState<any>([]);
  const [isSecondImg, setIsSecondImg] = useState<any>([]);

  const handleImagePicker = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      setSelectedImages(image);
    });
  };

  const handleSecondImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      setIsSecondImg(image);
    });
  };

  var bookData = {
    ...bookData,
    bookPhoto1: {
      uri: isSelectedImages?.path,
      type: isSelectedImages?.mime,
    },
    bookPhoto2: {
      uri: isSecondImg?.path,
      type: isSecondImg?.mime,
    },
  };

  const handleNext = () => {
    navigation.navigate('BookPrice', {bookData});
  };

  return (
    <ScrollView style={styles.constainer}>
      <Header backArrow />
      <CustomText label={t('uploadPhotos')} />

      <View style={styles.pickerContainer}>
        {isSelectedImages?.path ? (
          <TouchableOpacity
            // style={styles.picker}
            onPress={() => handleImagePicker()}>
            <Image
              style={styles.selectedImg}
              source={{uri: isSelectedImages?.path}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.picker}
            onPress={() => handleImagePicker()}>
            <Image style={styles.img} source={Images.galley} />
          </TouchableOpacity>
        )}

        {isSecondImg?.path ? (
          <TouchableOpacity
            // style={styles.picker}
            onPress={() => handleSecondImage()}>
            <Image
              style={styles.selectedImg}
              source={{uri: isSecondImg?.path}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.picker}
            onPress={() => handleSecondImage()}>
            <Image style={styles.img} source={Images.galley} />
          </TouchableOpacity>
        )}
      </View>

      {isSelectedImages?.path && isSecondImg?.path ? (
        <View style={styles.btnView}>
          <Button
            label={t('next')}
            marginVertical={40}
            onPress={() => handleNext()}
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

export default BookPhoto;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  picker: {
    height: 80,
    width: 80,
  },
  img: {
    height: 80,
    width: 80,
    // alignSelf: 'center',
  },

  btnView: {
    height: heightPixel(350),
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: heightPixel(300),
    alignSelf: 'center',
    marginVertical: pixelSizeVertical(60),
    alignItems: 'center',
  },
  selectedImg: {
    height: 150,
    width: 150,
    borderRadius: 12,
    margin: 10,
    resizeMode: 'contain',
  },
});
