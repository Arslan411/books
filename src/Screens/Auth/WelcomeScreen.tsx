/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import Theme from '../../Utils/Theme';
import Images from '../../Utils/Images';
const WelcomeScreen = ({navigation, route}: any) => {
  const {userData} = route.params;
  console.log('user', userData);
  return (
    <View style={styles.container}>
      <Text style={styles.text1Style}>
        Welcome {userData?.name},{'\n'} here is your profile
      </Text>
      <View style={styles.imgContainer}>
        <Image
          style={styles.imgStyle}
          source={
            userData?.photo ? {uri: userData?.photo?.path} : Images.dummyProfile
          }
        />
        <Text style={[styles.text2Style]}>
          {userData?.name + '\n' + userData?.surName}
        </Text>
      </View>
      <Text style={[styles.textStyle]}>
        {userData?.institute.length > 30
          ? `${userData?.institute.substring(0, 30)}...`
          : userData?.institute}
      </Text>
      <Text style={[styles.textStyle]}>
        IG {userData?.insta ? userData?.insta : '@Unknown'}
      </Text>

      {userData?.degree ? (
        <Text style={[styles.textStyle]}>{userData?.degree}</Text>
      ) : null}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>Join</Text>
      </TouchableOpacity>
      <Image
        style={styles.LogoStyle}
        source={require('../../Assets/Images/logoWhite.png')}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.primary,
  },
  text1Style: {
    fontSize: fontPixel(24),
    fontWeight: '400',
    textAlign: 'center',
    color: Theme.white,
    marginVertical: pixelSizeVertical(96),
  },
  textStyle: {
    fontSize: fontPixel(24),
    fontWeight: '400',
    textAlign: 'center',
    color: Theme.white,
    marginVertical: pixelSizeVertical(10),
  },
  imgContainer: {
    flexDirection: 'row',
    marginTop: heightPixel(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    borderRadius: 12.829,
    height: 80,
    width: 80,
  },
  LogoStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: heightPixel(183.55),
  },
  text2Style: {
    fontSize: fontPixel(24),
    fontWeight: '400',
    textAlign: 'center',
    color: Theme.white,
    marginLeft: widthPixel(10),
  },
});
