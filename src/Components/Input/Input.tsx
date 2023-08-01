import React, {FC} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

import Theme from '../../Utils/Theme';
import {
  fontPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';

export type props = {
  label?: string;
  forgot?: string;
  field?: boolean;
  onPress?: () => void;
  value?: string;
  onChangeText?: (key: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  width?: number;
  borderBottomColor?: string;
  color?: string;
  labelColor?: string;
  fontSize?: any;
};
const Input: FC<props> = ({
  label,
  forgot,
  field,
  onPress,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  width,
  borderBottomColor,
  color,
  labelColor,
  fontSize,
}) => {
  return (
    <View style={styles.constainer}>
      <View style={styles.row}>
        <Text
          style={[
            styles.label,
            {
              color: labelColor ? labelColor : Theme.primary,
              fontSize: fontSize ? fontSize : fontPixel(18),
            },
          ]}>
          {label}
        </Text>
        {forgot ? (
          <Text style={styles.forgotTxt} onPress={onPress}>
            {forgot}
          </Text>
        ) : null}
      </View>
      {field ? (
        <TextInput
          style={[
            styles.inputContainer,
            {
              width: width ? width : widthPixel(380),
              borderBottomColor: borderBottomColor
                ? borderBottomColor
                : Theme.borderColor,
              color: color ? color : Theme.black,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      ) : null}
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  constainer: {
    marginVertical: pixelSizeVertical(7),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPixel(380),
    alignSelf: 'center',
    top: 5,
  },
  label: {
    color: Theme.primary,
    fontSize: fontPixel(18),
    fontWeight: '400',
  },
  forgotTxt: {
    color: Theme.primary,
    fontSize: fontPixel(16),
    fontWeight: '400',
    textDecorationLine: 'underline',
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: Theme.borderColor,
    width: widthPixel(380),
    alignSelf: 'center',
    color: 'black',
    fontSize: fontPixel(21),
    fontWeight: '400',
  },
});
