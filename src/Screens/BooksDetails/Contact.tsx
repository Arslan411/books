import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import Theme from '../../Utils/Theme';

import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Images from '../../Utils/Images';
import Icons from '../../Constants/icons';
import Button from '../../Components/Button/Button';

const Contact = ({navigation}: any) => {
  const {t} = useTranslation('profile');

  return (
    <View style={styles.container}>
      {/* BackgroundImage */}
      <ImageBackground imageStyle={styles.bgImg} source={Images.bgProfile1}>
        <View style={styles.imgView} />
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}>
          <Image style={styles.settingIcon} source={Icons.arrowLight} />
        </TouchableOpacity>

        <Image style={styles.bgLogo} source={Images.uniLogo} />
        <View style={styles.position}>
          <View style={styles.row}>
            <Image style={styles.logo} source={Images.profile2} />
            <Text style={styles.name}>Napoleone{'\n'}Bonaparte</Text>
          </View>
          <Text style={styles.txt}>Università San Raffele</Text>
          <Text style={styles.txt}>IG @napoking505</Text>
          <Text style={styles.txt}>Medicina 6</Text>
        </View>
      </ImageBackground>

      <Button
        label={t('contact')}
        marginVertical={pixelSizeVertical(60)}
        color="#004034"
      />
    </View>
  );
};

export default Contact;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },

  bgImg: {
    height: heightPixel(640),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  imgView: {
    height: heightPixel(640),
    backgroundColor: '#004034',
    opacity: 0.6,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bgLogo: {
    position: 'absolute',
    alignSelf: 'center',
    top: '15%',
  },
  logo: {
    alignSelf: 'center',
    borderRadius: 10,
  },

  settingIcon: {
    height: 40,
    width: 40,
  },
  iconBtn: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: '6%',
    margin: 10,
    padding: 10,
    paddingRight: 15,
  },
  name: {
    color: Theme.white,
    fontSize: fontPixel(24),
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  position: {
    position: 'absolute',
    bottom: '13%',
    alignSelf: 'center',
  },
  txt: {
    color: Theme.white,
    fontSize: fontPixel(20),
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '400',
  },
});
