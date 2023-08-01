/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {fontPixel, heightPixel, widthPixel} from '../../Utils/Normalization';
import Header from '../../Components/Header/Header';
import Theme from '../../Utils/Theme';
import {
  GiftedChat,
  Send,
  InputToolbar,
  Composer,
} from 'react-native-gifted-chat';
import CustomModal from '../../Components/Modal/Modal';
import Images from '../../Utils/Images';

const CustomInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#B5B5B5',
        borderRadius: 10,
        marginLeft: widthPixel(17.5),
        width: widthPixel(300),
        bottom: 8.77,
      }}
    />
  );
};

const ChatScreen = ({navigation, route}: any) => {
  const [isVisible, setModalVisiblel] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const fetchBlockStatus = async () => {
      const blockStatus = await fetchUserBlockStatus();
      setIsBlocked(blockStatus);
    };

    fetchBlockStatus();
  }, []);

  useEffect(() => {
    const newLocal = 'React Native';
    setMessages([
      {
        _id: 1,
        text: '',
        user: {
          _id: 2,
          name: newLocal,
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const handlePress = () => {
    if (isBlocked === false) {
      setIsBlocked(true);
      setModalVisiblel(false);
    } else {
      setIsBlocked(false);
      setModalVisiblel(false);
    }
  };

  const onSend = useCallback((messages: any = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rowStyle}>
        <View style={styles.row}>
          <Header backArrow />
          <TouchableOpacity
            style={styles.inContainer}
            onPress={() => navigation.navigate('Contact')}>
            <Image
              style={styles.imgContainer}
              source={route.params?.item?.img}
            />
            <Text style={styles.nameTextStyle}>{route.params?.item?.name}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.iconStyle}
          onPress={() => setModalVisiblel(true)}>
          {isBlocked ? null : (
            <Image style={styles.blockUserImage} source={Images.blockUser} />
          )}
        </TouchableOpacity>
      </View>

      <CustomModal isVisible={isVisible} customStyles={styles.modaContainer}>
        <Text style={styles.modalTestStyle}>Block User</Text>
        <Text style={styles.confrirmText}>Proceed with blocking the user?</Text>
        <View style={styles.btnStyle}>
          <TouchableOpacity onPress={() => setModalVisiblel(false)}>
            <Text style={styles.okText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress()}>
            <Text style={styles.okText}>{isBlocked ? 'UnBlock' : 'Block'}</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
      {isBlocked ? (
        <View style={styles.blockedView}>
          <View style={styles.middleConatiner}>
            <Image style={styles.imgBlockStyle} source={Images.blockUser} />
            <Text style={styles.blockUserText}>Blocked User</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisiblel(true);
            }}
            style={styles.unblock}>
            <Text style={styles.unblockText}>Unblock</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <GiftedChat
          alwaysShowSend
          placeholder="Type Something"
          renderInputToolbar={props => <CustomInputToolbar {...props} />}
          renderComposer={props => (
            <Composer
              {...props}
              textInputProps={{
                ...props.textInputProps,
                placeholderTextColor: 'white',
                textAlignVertical: 'center',
              }}
            />
          )}
          renderSend={props => (
            <Send
              {...props}
              // eslint-disable-next-line react-native/no-inline-styles
              containerStyle={{
                justifyContent: 'center',
                position: 'relative',
                left: 45,
              }}>
              <Image
                style={styles.arrowStyle}
                source={require('../../Assets/Images/arrow.png')}
              />
            </Send>
          )}
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      )}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  rowStyle: {
    marginTop: heightPixel(20),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  row: {
    flexDirection: 'row',
  },
  inContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  imgContainer: {
    marginLeft: widthPixel(19),
    width: widthPixel(51.336),
    height: heightPixel(51),
    borderRadius: 8.724,
  },
  nameTextStyle: {
    width: widthPixel(120),
    alignSelf: 'center',
    marginLeft: 11,
    fontSize: 20.585,
    fontWeight: 'bold',
    color: '#04107E',
  },
  blockUserImage: {
    width: widthPixel(21.981),
    height: heightPixel(22),
  },
  arrowStyle: {
    resizeMode: 'contain',
    width: widthPixel(40),
    height: heightPixel(40),
  },
  iconStyle: {
    // position: 'absolute',
    // right: 37,
    // top: 33,
    marginTop: 10,
  },
  modaContainer: {
    borderColor: '#04107E',
    borderWidth: 1,
    alignItems: 'center',
    height: heightPixel(223),
    backgroundColor: Theme.white,
  },
  modalTestStyle: {
    fontSize: fontPixel(21.328),
    marginTop: heightPixel(58),
    color: '#04107E',
    fontWeight: '400',
  },
  confrirmText: {
    marginTop: heightPixel(24),
    fontSize: 13.648,
    fontWeight: '400',
    color: '#04107E',
  },
  okText: {
    color: '#04107E',
    fontSize: fontPixel(15.765),
    fontWeight: '400',
  },
  btnStyle: {
    marginTop: heightPixel(24),
    flexDirection: 'row',
    width: widthPixel(199),
    justifyContent: 'space-between',
  },
  blockedView: {},
  imgBlockStyle: {
    width: 48,
    height: 48.041,
  },
  middleConatiner: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: heightPixel(142),
    marginLeft: widthPixel(96.5),
  },
  blockUserText: {
    marginLeft: widthPixel(9),
    fontSize: fontPixel(21.328),
    fontWeight: '400',
    color: '#04107E',
  },
  unblock: {
    marginLeft: widthPixel(154),
    marginTop: heightPixel(42.96),
  },
  unblockText: {
    fontSize: fontPixel(22),
    fontWeight: '400',
    color: '#04107E',
  },
});
