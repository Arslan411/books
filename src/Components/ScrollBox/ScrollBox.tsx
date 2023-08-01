import React, {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import Theme from '../../Utils/Theme';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';

export type props = {
  label?: string;
  height?: number;
  width?: number;
  onSelect?: any;
};

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: any) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const ScrollBox: FC<props> = ({label, height, width, onSelect}) => (
  <View
    style={[
      styles.container,
      {
        height: height ? height : heightPixel(325),
        width: width ? width : widthPixel(325),
      },
    ]}>
    <ScrollView
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          onSelect(true);
        }
      }}
      scrollEventThrottle={400}>
      <Text style={styles.txt} selectable>
        {label}
      </Text>
    </ScrollView>
  </View>
);

export default ScrollBox;
const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    width: widthPixel(325),
    borderColor: Theme.grey,
    height: heightPixel(325),
    alignSelf: 'center',
    marginVertical: pixelSizeVertical(10),
    padding: 10,
  },

  txt: {
    fontSize: fontPixel(14.719),
    fontWeight: '400',
    color: Theme.grey,
    width: widthPixel(292),
  },
});
