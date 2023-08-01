import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import Theme from '../../Utils/Theme';
import {fontPixel} from '../../Utils/Normalization';

// import Theme from '../../Utils/Theme';
// import {fontPixel} from '../../Utils/Normalization';

export type props = {
  label?: string;
  customStyles?: any;
};

const CustomText: FC<props> = ({label, customStyles}) => (
  <Text style={[styles.label, {...customStyles}]}>{label}</Text>
);

export default CustomText;
const styles = StyleSheet.create({
  label: {
    // lineHeight: 2,
    color: Theme.darkPrimary,
    fontWeight: '500',
    fontSize: fontPixel(22),
    textAlign: 'center',
  },
});
