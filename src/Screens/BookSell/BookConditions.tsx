import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import Theme from '../../Utils/Theme';

import {fontPixel, heightPixel} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';

import Button from '../../Components/Button/Button';

import CustomText from '../../Components/CustomTxt/CustomTxt';
import {bookConditon, bookExercise} from '../../Utils/Json';

const BookCondition = ({navigation, route}: any) => {
  const {t} = useTranslation('bookSell');
  const [conditionSelected, setConditionSelected] = useState('');
  const [condition, setCondition] = useState(true);
  const [exerciseSelected, setExerciseSelected] = useState('');
  const [exercise, setExercise] = useState(false);

  const {isbn} = route?.params;

  const bookData = {
    isbn: isbn,
    condition: t(conditionSelected),
    exercise: t(exerciseSelected),
  };

  function handleBookConditions() {
    if (!conditionSelected) {
      Alert.alert('Alert', 'Please select the condition');
    } else if (conditionSelected && !exercise) {
      setCondition(false);
      setExercise(true);
    } else if (!exerciseSelected) {
      Alert.alert('Alert', 'Please select the exercises status');
    } else {
      navigation.navigate('BookPhoto', {bookData});
    }
  }

  function handleBackPress() {
    if (exercise) {
      setExercise(false);
      setCondition(true);
    } else if (condition) {
      navigation.goBack();
    }
  }
  return (
    <View style={styles.constainer}>
      <Header backArrow onPress={() => handleBackPress()} />
      <CustomText
        label={condition ? t('conditionTitle') : t('exerciseTitle')}
      />

      <View style={styles.innerContainer}>
        {condition
          ? bookConditon.map(res => (
              <Button
                marginVertical={4}
                fontWeight={conditionSelected === res.title ? '500' : '400'}
                label={t(res.title)}
                color={
                  conditionSelected === res.title
                    ? Theme.darkPrimary
                    : Theme.grey
                }
                fontSize={fontPixel(22)}
                onPress={() => setConditionSelected(res.title)}
              />
            ))
          : null}
        {exercise
          ? bookExercise.map(item => (
              <Button
                marginVertical={4}
                fontWeight={exerciseSelected === item.title ? '500' : '400'}
                label={t(item.title)}
                color={
                  exerciseSelected === item.title
                    ? Theme.darkPrimary
                    : Theme.grey
                }
                fontSize={fontPixel(22)}
                onPress={() => setExerciseSelected(item.title)}
              />
            ))
          : null}
      </View>
      <View style={styles.btnView}>
        <Button
          label={t('next')}
          marginVertical={40}
          onPress={() => handleBookConditions()}
        />
      </View>
    </View>
  );
};

export default BookCondition;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  innerContainer: {
    height: heightPixel(400),
    justifyContent: 'center',
  },

  btnView: {
    height: heightPixel(200),
    justifyContent: 'flex-start',
  },
});
