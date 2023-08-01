import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  Modal,
  Text,
} from 'react-native';

import Theme from '../../Utils/Theme';

import {fontPixel, heightPixel, widthPixel} from '../../Utils/Normalization';
import Images from '../../Utils/Images';
import Search from '../../Components/Search/Search';
import BooksCard from '../../Components/BooksCard/BooksCard';
import Header from '../../Components/Header/Header';
import SearchableDropdown from '../../Components/Search/ScrollableSearch';
import {
  proposalSearch,
  randomProposals,
  searchByISBN,
} from '../../Redux/Reducers/Proposals/ProposalSlice';
import {useDispatch, useSelector} from 'react-redux';
import ProposalCard from '../../Components/BooksCard/ProposalCard';
import {useIsFocused} from '@react-navigation/native';
import {getUserSchool} from '../../Redux/Reducers/User/ProfileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {randomNameGenerator} from '../../Utils/functions';

const Home = ({navigation}: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch<any>();
  const {randomProposalState, isAllProposals} = useSelector(
    (state: any) => state.proposalLists,
  );
  const {userProfileState} = useSelector((state: any) => state.profile);

  const [searchResults, setSearchResults] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [activeUser, setActiveUser] = useState<any>(null);

  const handleSelect = (item: any) => {
    setSelectedItem(item);
    setModalVisible(false);
  };

  useEffect(() => {
    fetchUser();
    dispatch(randomProposals());
  }, []);

  const fetchUser = async () => {
    const user = await AsyncStorage.getItem('userData');
    setActiveUser(JSON.parse(user));
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    setSelectedItem('');
  }, [isFocused]);

  useEffect(() => {
    if (userProfileState || activeUser) {
      const body = {
        intSchoolId: userProfileState?.intSchoolId || activeUser?.intSchoolId,
      };

      dispatch(getUserSchool(body)).then((res: any) => {
        setBannerImage(res?.payload?.data?.photoURL1);
      });
    }
  }, [userProfileState, activeUser, dispatch]);

  const listHeader = () => {
    return <View style={styles.spacing} />;
  };

  const handleISBNSearch = (txt: any) => {
    const body = {
      searchString: txt,
    };
    console.log('hgjfdfdhgf', body);
    dispatch(searchByISBN(body))
      .then((response: any) => {
        if (response?.payload?.data?.length > 0) {
          setSearchResults(response?.payload?.data);
        } else {
          setSearchResults([]);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const selectedlistHeader = () => {
    return (
      <View style={styles.headerContent}>
        <Image
          style={styles.bookCover}
          source={
            selectedItem?.coverURL
              ? {uri: selectedItem?.coverURL}
              : Images.book1
          }
        />

        {/* <Text style={styles.headerTxt}>{selectedItem?.author}</Text> */}
        <Text style={styles.headerTxt} numberOfLines={2}>
          {selectedItem?.title}
          {/* {selectedItem?.title.length > 20
            ? `${selectedItem?.title.substring(0, 20)}...`
            : selectedItem?.title} */}
        </Text>
        <Text style={styles.isbn}>{selectedItem?.isbn}</Text>
      </View>
    );
  };

  const handleProposalSearch = async () => {
    const adds = await AsyncStorage.getItem('showAdds');
    const val = JSON.parse(adds);

    const body = {
      isbn: selectedItem?.isbn,
      fromMySchool: val === null ? true : val,
    };
    dispatch(proposalSearch(body));
  };

  useEffect(() => {
    handleProposalSearch();
  }, [selectedItem]);

  const listEmpty = () => {
    return (
      <View style={styles.emptyHeaderContent}>
        <Text style={styles.txt}>No Proposal Found</Text>
      </View>
    );
  };

  return (
    <View style={styles.constainer}>
      {/* BackgroundImage */}
      <ImageBackground
        imageStyle={styles.bgImg}
        source={bannerImage ? {uri: bannerImage} : Images.bgImg}>
        <View style={styles.imgView} />

        <Image style={styles.bgLogo} source={Images.bgLogo} />
        <Image style={styles.logo} source={Images.logoWhite} />
      </ImageBackground>

      <View style={styles.listView}>
        <View style={styles.searchBarView}>
          <Search
            onPress={() => setModalVisible(true)}
            placeholder="Search for a title or ISBN code"
            editable={false}
          />
        </View>

        {selectedItem ? (
          <View style={styles.selectedItemContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={isAllProposals?.proposals}
              numColumns={2}
              keyExtractor={(item: any, index: any) => item.isbn + index}
              ListHeaderComponent={selectedlistHeader}
              ListEmptyComponent={listEmpty}
              renderItem={({item}) => (
                <ProposalCard
                  item={item}
                  onPress={() =>
                    navigation.navigate('BooksDetails', {item, sold: false})
                  }
                />
              )}
            />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={randomProposalState?.proposals}
            numColumns={2}
            keyExtractor={(item: any, index: any) => item.isbn + index}
            ListHeaderComponent={listHeader}
            renderItem={({item}) => (
              <BooksCard
                item={item}
                profile
                isConditions
                ISBN
                onPress={() =>
                  navigation.navigate('BooksDetails', {item, sold: false})
                }
              />
            )}
          />
        )}
      </View>

      <Modal visible={isModalVisible}>
        <Header
          backArrow
          onPress={() => setModalVisible(false)}
          label={'Please enter at least 7 characters of\na title or ISBN'}
        />

        <View>
          <SearchableDropdown
            data={searchResults}
            onSelect={handleSelect}
            onSearch={(txt: any) => handleISBNSearch(txt)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Home;
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
    flex: 1,
    flexGrow: 1,
    alignSelf: 'center',
  },
  searchBarView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
  contentContainer: {
    marginTop: '15%',
  },
  spacing: {
    height: heightPixel(65),
  },
  bookCover: {
    height: 180,
    width: 160,
    bottom: 10,
    marginTop: 100,
    resizeMode: 'contain',
  },
  selectedItemContainer: {
    flex: 1,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTxt: {
    color: Theme.black,
    fontWeight: '600',
    fontSize: fontPixel(16),
    lineHeight: 22,
    width: widthPixel(180),
    textAlign: 'center',
  },
  isbn: {
    color: Theme.black,
    fontSize: fontPixel(17),
    marginBottom: 10,
  },
  emptyHeaderContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPixel(180),
  },
  txt: {
    color: Theme.black,
    fontWeight: 'bold',
    fontSize: fontPixel(22),
  },
});
