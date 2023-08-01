import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';

import Theme from '../../Utils/Theme';
import {fontPixel, heightPixel, widthPixel} from '../../Utils/Normalization';
import Icons from '../../Constants/icons';

export type props = {
  onPress?: () => void;
  editable?: boolean;
  placeholder?: string;
  value?: any;
  onChangeText?: any;
};
const Search: FC<props> = ({
  onPress,
  editable,
  placeholder,
  value,
  onChangeText,
}) => (
  <TouchableOpacity
    onPress={() => {
      if (!editable) {
        onPress();
      }
    }}
    style={styles.container}>
    <Image style={styles.icon} source={Icons.searchIcon} />
    {/* {editable && ( */}
    <TextInput
      editable={editable}
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={Theme.white}
      value={value}
      onChangeText={onChangeText}
    />
    {/* )} */}
  </TouchableOpacity>
);

export default Search;
const styles = StyleSheet.create({
  container: {
    width: widthPixel(385),
    height: heightPixel(50),
    backgroundColor: Theme.darkPrimary,
    alignItems: 'center',
    borderRadius: 17,
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  input: {
    color: Theme.white,
    fontSize: fontPixel(17),
    width: widthPixel(340),
  },
});
