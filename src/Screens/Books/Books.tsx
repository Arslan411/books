import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Theme from '../../Utils/Theme';

import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import {getAllBooks} from '../../Utils/Json';
import BooksCard from '../../Components/BooksCard/BooksCard';
import {useDispatch, useSelector} from 'react-redux';
import {proposalList} from '../../Redux/Reducers/Proposals/ProposalSlice';
import {useIsFocused} from '@react-navigation/native';

const Books = ({navigation}: any) => {
  const isFocused = useIsFocused();
  const {proposalListState, isLoading} = useSelector(
    (state: any) => state.proposalLists,
  );
  console.log('loadimnggg', isLoading);

  const {t} = useTranslation('books');
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(proposalList());
  }, [isFocused]);

  const emptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.txt}>No Proposals Found</Text>
      </View>
    );
  };

  return (
    <View style={styles.constainer}>
      <TouchableOpacity
        style={styles.btnView}
        onPress={() => navigation.navigate('BookSell')}>
        <Text style={styles.btnLabel}>{t('title')}</Text>
      </TouchableOpacity>
      <View style={styles.listView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={proposalListState?.proposals}
          ListEmptyComponent={
            isLoading ? (
              <View style={styles.loaderView}>
                <ActivityIndicator color={Theme.darkPrimary} size={30} />
              </View>
            ) : (
              emptyComponent()
            )
          }
          numColumns={2}
          keyExtractor={(val: any) => val.id}
          renderItem={({item}) => (
            <BooksCard
              item={item}
              myBook
              onPress={() =>
                navigation.navigate('BooksDetails', {
                  item,
                  sold: true,
                  isMyActiveList: true,
                })
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default Books;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },

  bgImg: {
    height: heightPixel(260.468),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  imgView: {
    height: heightPixel(260.468),
    backgroundColor: Theme.darkPrimary,
    opacity: 0.6,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bgLogo: {
    position: 'absolute',
    alignSelf: 'center',
    top: 80,
  },
  logo: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  listView: {
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
  },
  btnView: {
    backgroundColor: Theme.darkPrimary,
    width: widthPixel(360),
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: pixelSizeVertical(20),
  },
  btnLabel: {
    color: Theme.white,
    fontSize: fontPixel(16.413),
    fontWeight: '800',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPixel(700),
  },
  txt: {
    color: Theme.black,
    fontSize: fontPixel(21),
    fontWeight: '700',
  },
  loaderView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPixel(750),
  },
});
