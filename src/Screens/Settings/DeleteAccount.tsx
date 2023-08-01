import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Theme from '../../Utils/Theme';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';
import CustomText from '../../Components/CustomTxt/CustomTxt';
import Button from '../../Components/Button/Button';
import {useDispatch} from 'react-redux';
import {deleteAccount} from '../../Redux/Reducers/DeleteAccount/AccountDeleteSlice';

const DeleteAccount = ({navigation}: any) => {
  const {t} = useTranslation('settings');
  const [state, setState] = useState(true);

  const dispatch = useDispatch<any>();
  function handleDelete() {
    if (state) {
      setState(false);
    } else {
      const body = {
        email: 'arslanimran411@gmail.com',
      };
      dispatch(deleteAccount(body)).then((res: any) => {
        if (res?.payload !== undefined) {
          navigation.navigate('VerificationCode', {credentials: false});
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      <Header
        backArrow
        label={t('deleteAccount')}
        fontSize={fontPixel(24.084)}
        fontWeight={'bold'}
      />
      <View style={styles.txtView}>
        {state ? (
          <View>
            <CustomText
              customStyles={styles.txt}
              label={t('deleteAccountPermanently')}
            />
            <CustomText
              customStyles={styles.txt}
              label={t('re-enableAccount')}
            />
          </View>
        ) : (
          <CustomText customStyles={styles.txt} label={t('wantToDelete')} />
        )}
      </View>

      <Button
        label={!state ? t('yes') : t('next')}
        color={Theme.grey}
        marginVertical={pixelSizeVertical(20)}
        onPress={() => handleDelete()}
      />
    </View>
  );
};

export default DeleteAccount;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },

  txt: {
    color: Theme.grey,
    fontSize: fontPixel(24.084),
    fontWeight: '400',
    marginVertical: pixelSizeVertical(20),
  },

  txtView: {height: heightPixel(500)},
});
