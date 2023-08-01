/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

import Theme from '../../Utils/Theme';
import Images from '../../Utils/Images';
import Icons from '../../Constants/icons';
import {fontPixel, heightPixel} from '../../Utils/Normalization';
import {useNavigation} from '@react-navigation/native';

export type props = {
  label?: string;
  logo?: boolean;
  backArrow?: boolean;
  onPress?: () => void;
  fontWeight?: any;
  fontSize?: number;
};
const Header: FC<props> = ({
  label,
  logo,
  backArrow,
  onPress,
  fontWeight,
  fontSize,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.constainer}>
      <View style={styles.row}>
        {backArrow ? (
          <TouchableOpacity
            onPress={onPress ? onPress : () => navigation.goBack()}>
            <Image source={Icons.backArrowIcon} />
          </TouchableOpacity>
        ) : null}
        {label ? (
          <Text
            style={[
              styles.txt,
              {
                fontWeight: fontWeight ? fontWeight : '400',
                fontSize: fontSize ? fontSize : fontPixel(15.719),
              },
            ]}>
            {label}
          </Text>
        ) : null}
      </View>
      {logo ? (
        <View style={styles.imgView}>
          <Image source={Images.appLogoBlue} />
        </View>
      ) : null}
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  constainer: {
    backgroundColor: Theme.white,
    padding: 15,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPixel(70),
    marginTop: 10,
  },
  txt: {
    fontWeight: '400',
    color: Theme.grey,
    fontSize: fontPixel(15.719),
    marginLeft: 10,
  },
});
