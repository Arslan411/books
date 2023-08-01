import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import Theme from '../../Utils/Theme';

import {
  fontPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';
import Button from '../../Components/Button/Button';
import CustomText from '../../Components/CustomTxt/CustomTxt';
import {bookConditon, bookExercise} from '../../Utils/Json';
import {launchImageLibrary} from 'react-native-image-picker';
import {addZeroes, findDacayUsageKeyByValue} from '../../Utils/functions';
import {useDispatch, useSelector} from 'react-redux';
// import {updateProfile} from '../../Redux/Reducers/User/ProfileSlice';
import {updateProposal} from '../../Redux/Reducers/Proposals/InsertProposal';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {proposalRevoke} from '../../Redux/Reducers/Proposals/ProposalSlice';
import Loader from '../../Components/Loader/Loader';

const EditBookAdd = ({route}: any) => {
  const {isLoading} = useSelector((state: any) => state.proposalLists);
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const {t} = useTranslation('bookSell');

  const {item} = route.params;
  const [price, setPrice] = useState(item.price);
  const [conditionSelected, setConditionSelected] = useState(item.decay);
  const [exerciseSelected, setExerciseSelected] = useState(item.usage);
  const [isSelectedImages, setSelectedImages] = useState<any>([]);

  const handleImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 2,
    };
    const result = await launchImageLibrary(options);
    setSelectedImages(result.assets);
  };

  const handleUpdate = () => {
    const body = {
      isbn: item.isbn,
      decay: conditionSelected,
      usage: exerciseSelected,
      price: Number(addZeroes(price)),
    };
    dispatch(updateProposal(body)).then((response: any) => {
      if (response?.payload?.data?.code === 0) {
        navigation.navigate('Books');
        Toast.show({
          type: 'success',
          text1: 'Update Successful!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error Updating!',
        });
      }
    });
  };
  const handleRevoke = () => {
    const body = {
      isbn: item.isbn,
    };
    dispatch(proposalRevoke(body)).then((res: any) => {
      if (res?.payload?.data) {
        navigation.navigate('UserStack', {
          screen: 'Bottom',
        });
      }
    });
  };
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <Loader color={Theme.primary} />
      ) : (
        <View>
          <Header backArrow />
          <CustomText customStyles={styles.underlineTxt} label={t('price')} />
          <TextInput
            style={styles.input}
            value={addZeroes(price)}
            onChangeText={(val: any) => setPrice(val)}
            // onEndEditing={prev => setPrice(addZeroes(price))}
          />

          <View style={styles.mapView}>
            <CustomText
              customStyles={styles.underlineTxt}
              label={t('conditionOfTheBook')}
            />
            {bookConditon?.map(res => (
              <Button
                marginVertical={1}
                fontWeight={
                  conditionSelected ===
                  findDacayUsageKeyByValue(t(res.title), 'decay')
                    ? '500'
                    : '400'
                }
                label={t(res.title)}
                color={
                  conditionSelected ===
                  findDacayUsageKeyByValue(t(res.title), 'decay')
                    ? Theme.darkPrimary
                    : Theme.grey
                }
                fontSize={fontPixel(22)}
                onPress={() => {
                  setConditionSelected(
                    findDacayUsageKeyByValue(t(res.title), 'decay'),
                  );
                }}
              />
            ))}
          </View>

          <View style={styles.mapView}>
            <CustomText
              customStyles={styles.underlineTxt}
              label={t('exercisesConditions')}
            />
            {bookExercise?.map(i => (
              <Button
                marginVertical={2}
                fontWeight={
                  exerciseSelected ===
                  findDacayUsageKeyByValue(t(i.title), 'usage')
                    ? '500'
                    : '400'
                }
                label={t(i.title)}
                color={
                  exerciseSelected ===
                  findDacayUsageKeyByValue(t(i.title), 'usage')
                    ? Theme.darkPrimary
                    : Theme.grey
                }
                fontSize={fontPixel(22)}
                onPress={() =>
                  setExerciseSelected(
                    findDacayUsageKeyByValue(t(i.title), 'usage'),
                  )
                }
              />
            ))}
          </View>
          <View style={styles.row}>
            {isSelectedImages?.length >= 1
              ? isSelectedImages?.map((data: any) => (
                  <TouchableOpacity onPress={() => handleImagePicker()}>
                    <Image style={styles.img} source={data} />
                  </TouchableOpacity>
                ))
              : item?.bookImg?.map((data: any) => (
                  <TouchableOpacity onPress={() => handleImagePicker()}>
                    <Image style={styles.img} source={data} />
                  </TouchableOpacity>
                ))}
          </View>

          <View style={styles.buttonsRow}>
            <Button label={t('remove')} onPress={() => handleRevoke()} />
            <Button label={t('save')} onPress={() => handleUpdate()} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default EditBookAdd;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  underlineTxt: {
    fontWeight: '400',
    textDecorationLine: 'underline',
    fontSize: fontPixel(25),
    bottom: 5,
  },
  input: {
    color: Theme.darkPrimary,
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: fontPixel(19.521),
  },
  mapView: {
    marginTop: '5%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthPixel(300),
    alignSelf: 'center',
    marginVertical: 20,
    resizeMode: 'contain',
  },
  img: {
    height: 140,
    width: 140,
  },
  buttonsRow: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: pixelSizeVertical(15),
  },
});
