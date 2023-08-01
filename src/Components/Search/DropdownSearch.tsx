import React, {useState, FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Theme from '../../Utils/Theme';
import {fontPixel, heightPixel, widthPixel} from '../../Utils/Normalization';
import Icons from '../../Constants/icons';

export type props = {
  onSelect?: any;
  data?: any;
  placeholder?: string;
  isObj?: boolean;
};

const DropDownSearch: FC<props> = ({data, onSelect, placeholder, isObj}) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text: any) => {
    setQuery(text);
    const filtered = data.filter((item: any) => {
      if (item !== null) {
        return isObj
          ? item.institute.toLowerCase().includes(text.toLowerCase())
          : item.toLowerCase().includes(text.toLowerCase());
      } else {
        return '';
      }
    });
    setFilteredData(filtered);
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity style={styles.listView} onPress={() => onSelect(item)}>
      <View>
        <Text style={styles.txt}>{!isObj ? item : item.institute}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.input}>
        <Image source={Icons.searchIcon} />
        <TextInput
          style={styles.inputInner}
          value={query}
          onChangeText={handleSearch}
          placeholder={placeholder}
          placeholderTextColor={Theme.white}
        />
      </View>
      <FlatList
        indicatorStyle="white"
        data={filteredData}
        renderItem={renderItem}
      />
    </View>
  );
};

export default DropDownSearch;
const styles = StyleSheet.create({
  listView: {
    backgroundColor: Theme.primary,
    borderColor: Theme.white,
    width: widthPixel(280),
    marginTop: 0.4,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    alignSelf: 'center',
    // height: 40,
  },

  input: {
    backgroundColor: Theme.primary,
    borderRadius: 10,
    height: heightPixel(45),
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPixel(280),
    alignSelf: 'center',
    paddingLeft: 10,
    justifyContent: 'center',
    // marginTop: '10%',
  },
  inputInner: {
    color: Theme.white,
    fontWeight: 'bold',
    width: widthPixel(250),
    fontSize: fontPixel(18),
  },
  txt: {
    color: Theme.white,
  },
});
