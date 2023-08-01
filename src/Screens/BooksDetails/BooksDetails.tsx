/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Swiper from 'react-native-swiper';

import Theme from '../../Utils/Theme';

import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header/Header';
import Icons from '../../Constants/icons';
import Button from '../../Components/Button/Button';
import CustomModal from '../../Components/Modal/Modal';
import {
  addZeroes,
  findDacayUsageValue,
  formatName,
} from '../../Utils/functions';
import Images from '../../Utils/Images';
import {useDispatch} from 'react-redux';
import {soldProposal} from '../../Redux/Reducers/Proposals/InsertProposal';
import {
  proposalReport,
  proposalSearch,
} from '../../Redux/Reducers/Proposals/ProposalSlice';
import Toast from 'react-native-toast-message';

const BooksDetails = ({navigation, route}: any) => {
  const dispatch = useDispatch<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation('books');
  const {sold, item, isMyActiveList} = route?.params;
  const [isCurrentActiveItem, setCurrentActiveItem] = useState<any>({});
  const [imageViewerModal, setImageViewerModal] = useState(false);

  const inputRef = useRef<any>();

  useEffect(() => {
    if (isMyActiveList) {
      const body = {
        isbn: item?.isbn,
        fromMySchool: true,
      };
      dispatch(proposalSearch(body)).then((res: any) =>
        setCurrentActiveItem(res?.payload?.data),
      );
    }
  }, [dispatch, item, isMyActiveList]);

  const handleReport = () => {
    setModalVisible(true);
  };

  const handleSoldProposal = () => {
    const body = {
      proposalId: item?.id,
    };
    dispatch(soldProposal(body)).then((res: any) => {
      if (res?.payload?.data) {
        Toast.show({
          type: 'success',
          text1: 'Proposal updated as sold',
        });
        navigation.goBack();
      }
    });
  };

  function handleReportApi() {
    const body = {
      proposalId: item?.id,
    };
    dispatch(proposalReport(body)).then((res: any) => {
      if (res?.payload?.data) {
        Toast.show({
          type: 'success',
          text1: 'Reported proposal successfully',
        });
        navigation.goBack();
      }
    });
  }

  const proposalImages = [
    isCurrentActiveItem.proposals?.[0]?.proposalPhotoURL1 ??
      item.proposalPhotoURL1,
    isCurrentActiveItem.proposals?.[0]?.proposalPhotoURL2 ??
      item.proposalPhotoURL2,
  ];
  return (
    <ScrollView style={styles.constainer}>
      <Header backArrow />

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.title}>
          {isCurrentActiveItem.title ?? item.title}
        </Text>

        <View style={styles.imgView}>
          <View
            style={[
              styles.bookContainer,
              {
                backgroundColor:
                  item.coverURL || isCurrentActiveItem.coverURL
                    ? Theme.darkPrimary
                    : Theme.lightGrey,
              },
            ]}>
            <Image
              style={styles.bookCover}
              source={
                item.coverURL
                  ? {uri: isCurrentActiveItem.coverURL ?? item.coverURL}
                  : item.img
              }
            />
          </View>

          {!sold && (
            <TouchableOpacity
              style={styles.flag}
              onPress={() => handleReport()}>
              <Image source={Icons.flatIcon} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.name}>
          {isCurrentActiveItem.author ?? item.author}
        </Text>
        <Text style={styles.isbn}>{item.isbn}</Text>

        <View style={styles.rowImg}>
          {proposalImages?.map((res: any) => {
            return (
              <TouchableOpacity onPress={() => setImageViewerModal(true)}>
                <Image
                  style={styles.booksImg}
                  source={res ? {uri: res} : Images.book3}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {(isCurrentActiveItem.proposals?.[0]?.decay || item.decay) && (
          <Text style={styles.name}>
            {findDacayUsageValue(
              isCurrentActiveItem.proposals?.[0]?.decay ?? item.decay,
              'decay',
            )}
          </Text>
        )}
        {(isCurrentActiveItem.proposals?.[0]?.usage || item.usage) && (
          <Text style={styles.name}>
            {findDacayUsageValue(
              isCurrentActiveItem.proposals?.[0]?.usage ?? item.usage,
              'usage',
            )}
          </Text>
        )}
        <Text style={styles.price}>
          €{addZeroes(isCurrentActiveItem.proposals?.[0]?.price ?? item.price)}
        </Text>
        {!isMyActiveList && (
          <View style={{flexDirection: 'row'}}>
            {item?.userPhotoURL && !isMyActiveList && (
              <Image
                style={styles.profileIcon}
                source={
                  item?.userPhotoURL
                    ? {uri: item?.userPhotoURL}
                    : Images.profile1
                }
              />
            )}
            <Text style={styles.name}>{`${formatName(
              item.firstName,
            )}\n${formatName(item.lastName)}`}</Text>
          </View>
        )}
        {/* </View> */}
        {!sold ? (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.row1}
              onPress={() => navigation.navigate('Contact')}>
              <Image style={styles.profile} source={item.profile} />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
            <Button
              label={t('contact')}
              onPress={() => navigation.navigate('ChatScreen', {item: item})}
            />
          </>
        ) : (
          <View style={styles.editView}>
            <Button
              label={t('edit')}
              onPress={() => navigation.navigate('EditBookAdd', {item: item})}
            />

            {/* <Text style={[styles.title, {marginRight: 20}]}>{t('sold')}</Text> */}
            <Button
              label={t('sold')}
              // style={[styles.title, {marginRight: 20}]}
              // onPress={() => navigation.navigate('EditBookAdd', {item: item})}
              onPress={() => handleSoldProposal()}
            />
          </View>
        )}
        <CustomModal
          customStyles={styles.modelContainer}
          isVisible={isModalVisible}>
          <Text style={[styles.name]}>{t('reportAd')}</Text>
          <Text style={[styles.isbn, {marginVertical: 13}]}>{t('reason')}</Text>
          <TextInput
            style={styles.input}
            ref={inputRef}
            onLayout={() => inputRef.current.focus()}
          />
          <View style={styles.row}>
            <Button
              label={t('back')}
              fontSize={fontPixel(19)}
              onPress={() => setModalVisible(false)}
            />
            <Button
              label={t('report')}
              fontSize={fontPixel(19)}
              onPress={() => handleReportApi()}
            />
          </View>
        </CustomModal>

        <View style={styles.freeSpace} />
      </View>

      <CustomModal
        customStyles={styles.imageViewer}
        isVisible={imageViewerModal}>
        <TouchableOpacity
          style={styles.crossContainer}
          onPress={() => setImageViewerModal(false)}>
          <Image source={Icons.cross} />
        </TouchableOpacity>
        <Swiper
          removeClippedSubviews={false}
          style={styles.wrapper}
          showsButtons={true}
          showsPagination={false}>
          <View style={styles.slide1}>
            <Image
              style={styles.proposalImgs}
              source={
                proposalImages[0] ? {uri: proposalImages[0]} : Images.book3
              }
            />
          </View>
          <View style={styles.slide2}>
            <Image
              style={styles.proposalImgs}
              source={
                proposalImages[1] ? {uri: proposalImages[1]} : Images.book3
              }
            />
          </View>
        </Swiper>
      </CustomModal>
    </ScrollView>
  );
};

export default BooksDetails;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  title: {
    color: Theme.darkPrimary,
    fontSize: fontPixel(26),
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  name: {
    color: Theme.darkPrimary,
    fontSize: fontPixel(20.614),
    fontWeight: '500',
    marginVertical: pixelSizeVertical(3),
  },
  isbn: {
    color: Theme.darkPrimary,
    fontSize: fontPixel(13.718),
    fontWeight: '500',
    marginVertical: pixelSizeVertical(3),
  },
  bookContainer: {
    backgroundColor: Theme.darkPrimary,
    height: heightPixel(250),
    width: widthPixel(180),
  },
  bookCover: {
    height: heightPixel(250),
    width: widthPixel(180),
    position: 'absolute',
    top: -10,
    left: 10,
  },
  price: {
    color: Theme.darkPrimary,
    fontSize: fontPixel(24.622),
    fontWeight: '600',
    padding: 20,
  },
  imgView: {
    alignSelf: 'center',
    elevation: 20,
    height: heightPixel(246.832),
    width: widthPixel(179),
    marginVertical: pixelSizeVertical(20),
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: widthPixel(320),
    justifyContent: 'space-between',
    marginVertical: pixelSizeVertical(10),
  },
  rowImg: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: widthPixel(320),
    justifyContent: 'space-evenly',
    marginVertical: pixelSizeVertical(10),
  },
  booksImg: {
    width: widthPixel(120),
    height: heightPixel(140),
    borderRadius: 13,
  },
  txt: {
    color: Theme.darkPrimary,
    fontSize: fontPixel(21),
    fontWeight: '500',
  },
  flag: {
    position: 'relative',
    left: 15,
    top: 24,
  },
  profile: {
    height: 85,
    width: 85,
    borderRadius: 12,
  },
  profileIcon: {
    height: 50,
    width: 50,
    borderRadius: 12,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: widthPixel(150),
    justifyContent: 'space-between',
  },
  freeSpace: {
    height: heightPixel(100),
  },
  editView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: widthPixel(360),
    justifyContent: 'space-between',
    marginVertical: pixelSizeVertical(20),
  },
  modelContainer: {
    width: widthPixel(354),
    height: heightPixel(250),
    backgroundColor: Theme.white,
    padding: 20,
  },
  input: {
    borderBottomWidth: 3,
    borderBottomColor: Theme.darkPrimary,
    bottom: 10,
    color: Theme.black,
  },
  imageViewer: {
    height: heightPixel(550),
    backgroundColor: Theme.white,
    borderRadius: 20,
  },
  proposalImgs: {
    height: heightPixel(450),
    resizeMode: 'contain',
    justifyContent: 'center',
    marginTop: 4,
  },
  wrapper: {height: heightPixel(500)},
  slide1: {
    flex: 1,
  },
  slide2: {
    flex: 1,
  },
  crossContainer: {
    alignSelf: 'flex-end',
    padding: 10,
  },
});
