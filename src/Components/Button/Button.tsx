import React, {FC} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Theme from '../../Utils/Theme';
import {fontPixel} from '../../Utils/Normalization';

export type props = {
  label?: string;
  onPress?: () => void;
  marginVertical?: number;
  bgColor?: string;
  fontSize?: number;
  color?: string;
  fontWeight?: any;
  disabled?: boolean;
  isLoading?: boolean;
};
const Button: FC<props> = ({
  label,
  onPress,
  marginVertical,
  bgColor,
  fontSize,
  color,
  fontWeight,
  disabled,
  isLoading,
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[
      styles.container,
      // eslint-disable-next-line react-native/no-inline-styles
      {
        marginVertical: marginVertical ? marginVertical : 0,
        backgroundColor: bgColor ? bgColor : 'transparent',
      },
    ]}
    onPress={onPress}>
    <Text
      style={[
        styles.label,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          fontSize: fontSize ? fontSize : fontPixel(26),
          color: color ? color : Theme.darkPrimary,
          fontWeight: fontWeight ? fontWeight : '500',
        },
      ]}>
      {isLoading ? <ActivityIndicator color={Theme.white} size={30} /> : label}
    </Text>
  </TouchableOpacity>
);

export default Button;
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 12,
    padding: 6,
    paddingRight: 23,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 23,
  },
  label: {
    // fontSize: fontPixel(26),
    fontWeight: '500',
    color: Theme.darkPrimary,
  },
});
