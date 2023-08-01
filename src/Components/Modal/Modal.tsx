import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import Modal from 'react-native-modal';
// import {StyleSheet} from 'react-native/types';

export type props = {
  isVisible?: boolean;
  children?: any;
  customStyles?: any;
};
const CustomModal: FC<props> = ({isVisible, children, customStyles}) => (
  <Modal isVisible={isVisible}>
    <View style={[styles.container, {...customStyles}]}>{children}</View>
  </Modal>
);

export default CustomModal;
const styles = StyleSheet.create({
  container: {height: 10},
});
