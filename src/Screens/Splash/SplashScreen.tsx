import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import Images from '../../Utils/Images';
import Theme from '../../Utils/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
const Splash = ({navigation}: any) => {
  const logoFade = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch<any>();

  useEffect(() => {
    Animated.timing(logoFade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      console.log('token', token);

      if (token) {
        navigation.navigate('UserStack');
      } else {
        navigation.navigate('AuthStack');
      }
    }, 1000);
  }, [logoFade, navigation]);

  return (
    <View style={styles.constainer}>
      <Animated.Image
        style={[styles.img, {opacity: logoFade}]}
        source={Images.appLogoLight}
      />
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    marginBottom: '24%',
  },
});
