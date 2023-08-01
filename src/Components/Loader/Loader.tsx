import React, {FC} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {heightPixel} from '../../Utils/Normalization';

export type props = {
  color?: any;
};
const Loader: FC<props> = ({color}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={30} color={color} />
    </View>
  );
};

export default Loader;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPixel(900),
  },
});
