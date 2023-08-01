import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Image, Text} from 'react-native';

import Theme from '../../Utils/Theme';
import Header from '../../Components/Header/Header';

import {heightPixel, widthPixel} from '../../Utils/Normalization';

import BooksCard from '../../Components/BooksCard/BooksCard';
import Images from '../../Utils/Images';
import {useDispatch} from 'react-redux';
import {proposalAround} from '../../Redux/Reducers/Proposals/ProposalSlice';
import {useTranslation} from 'react-i18next';

const HaveLook = () => {
  const dispatch = useDispatch<any>();
  const [lookAroundBooksProposals, setBookProposals] = useState([]);

  const {t} = useTranslation('lookAround');

  useEffect(() => {
    dispatch(proposalAround()).then(response => {
      if (response?.payload) {
        setBookProposals(response?.payload?.data?.proposals);
      }
    });
  }, []);

  return (
    <View style={styles.constainer}>
      <View style={styles.headerView}>
        <Header backArrow />
        <Image style={styles.img} source={Images.appLogoBlue} />
      </View>

      <View style={styles.listView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={lookAroundBooksProposals}
          numColumns={2}
          keyExtractor={(val: any, index: number) => val.isbn + index}
          renderItem={({item}) => (
            <BooksCard item={item} profile isConditions ISBN disabled />
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyTxtContainer}>
              <Text style={styles.emptyTxt}>{t('emptyTxt')}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HaveLook;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },

  listView: {
    flex: 1,
    flexGrow: 1,
    alignSelf: 'center',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: heightPixel(35),
    width: widthPixel(240),
    resizeMode: 'contain',
    marginTop: 12,
  },
  emptyTxtContainer: {marginTop: heightPixel(300)},
  emptyTxt: {fontSize: 18},
});
