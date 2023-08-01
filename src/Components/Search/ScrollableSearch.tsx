/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Search from './Search';
import Theme from '../../Utils/Theme';
import {widthPixel} from '../../Utils/Normalization';
import Images from '../../Utils/Images';

const SearchableDropdown = ({data, onSelect, onSearch}: any) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text: any) => {
    setQuery(text);
    onSearch(text);
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity style={styles.listView} onPress={() => onSelect(item)}>
      <Image
        style={styles.img}
        source={item.coverURL ? {uri: item.coverURL} : Images.book1}
      />
      <View style={styles.txtView}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={{color: 'black'}}>{item.isbn}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Search value={query} onChangeText={handleSearch} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default SearchableDropdown;
const styles = StyleSheet.create({
  listView: {
    backgroundColor: Theme.white,
    borderColor: Theme.grey,
    width: widthPixel(360),
    marginLeft: '7%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    margin: 20,
  },
  img: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  title: {
    width: widthPixel(270),
    color: Theme.black,
  },
  txtView: {
    marginLeft: 10,
  },
});
