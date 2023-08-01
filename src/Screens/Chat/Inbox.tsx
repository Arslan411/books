/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Theme from '../../Utils/Theme';
import {fontPixel, heightPixel, widthPixel} from '../../Utils/Normalization';
import {chatData} from '../../Utils/Json';
import {useNavigation} from '@react-navigation/native';

const Inbox = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.chatTextStyle}>Chat</Text>
      <FlatList
        data={chatData}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}: any) => (
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() =>
              navigation.navigate('ChatScreen', {
                item,
              })
            }>
            <Image style={styles.imgStyle} source={item.img} />
            <View style={styles.textStyle}>
              <Text style={styles.nameTextStyle}>{item.name}</Text>
              {item.newMsg ? (
                <Text style={styles.newMsgStyle}>{item.newMsg}</Text>
              ) : null}
              {item.lastMsg ? (
                <Text style={styles.lastMsgStyle}>{item.lastMsg}</Text>
              ) : null}
            </View>
            {item.newMsgCounter > 0 ? (
              <View style={styles.msgCounter}>
                <Text style={styles.msgCounterText}>{item.newMsgCounter}</Text>
              </View>
            ) : (
              <View style={styles.msgTimeStyle}>
                <Text>{item.time}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  chatTextStyle: {
    fontSize: fontPixel(32.393),
    fontWeight: 'bold',
    color: '#04107E',
    marginLeft: widthPixel(21),
    marginTop: heightPixel(18),
  },
  flatlistStyle: {
    marginLeft: fontPixel(18),
  },
  imgStyle: {
    borderRadius: 8.724,
    margin: 5,
    width: widthPixel(51),
    height: heightPixel(51),
  },
  innerContainer: {
    marginVertical: heightPixel(5),
    borderBottomWidth: 0.3,
    borderBottomColor: Theme.grey,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: widthPixel(18),
    marginRight: widthPixel(17),
  },
  nameTextStyle: {
    fontSize: fontPixel(20.585),
    fontWeight: 'bold',
    color: '#04107E',
  },
  newMsgStyle: {
    fontSize: fontPixel(15.665),
    fontWeight: '600',
    color: Theme.darkBluePlus,
  },
  msgCounterText: {
    fontWeight: 'bold',
    color: Theme.white,
    fontSize: fontPixel(11),
  },
  msgCounter: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 17,
    bottom: 7,
    width: widthPixel(33),
    height: heightPixel(17.069),
    backgroundColor: Theme.darkBluePlus,
    borderRadius: 68.793,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgTimeStyle: {
    color: '#777777',
    position: 'absolute',
    right: 17,
    alignSelf: 'flex-end',
    bottom: 7,
    fontWeight: '400',
  },
  textStyle: {
    marginLeft: widthPixel(10.92),
  },
  lastMsgStyle: {
    color: '#777777',
    fontWeight: '400',
    fontSize: fontPixel(15.665),
  },
});
