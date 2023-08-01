import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from 'react-native';
import Images from '../../Utils/Images';
import Theme from '../../Utils/Theme';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import {
  addZeroes,
  findDacayUsageValue,
  formatName,
} from '../../Utils/functions';

export type props = {
  onPress?: () => void;
  item?: any;
  myBook?: boolean;
  profile?: boolean;
  isConditions?: boolean;
  ISBN?: boolean;
  disabled?: boolean;
};
const BooksCard: FC<props> = ({
  onPress,
  item,
  myBook,
  profile,
  isConditions,
  disabled,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    disabled={disabled}>
    {profile && (
      <View style={styles.row}>
        {item?.userPhotoURL && (
          <Image
            style={styles.profile}
            source={
              item?.userPhotoURL ? {uri: item?.userPhotoURL} : Images.profile1
            }
          />
        )}
        <Text style={styles.name}>{formatName(item?.author)}</Text>
      </View>
    )}

    <Image
      style={styles.bookImg}
      source={item.coverURL ? {uri: item.coverURL} : Images.book1}
    />
    <View style={{alignSelf: 'flex-start'}}>
      <Text style={styles.name}>{item.title}</Text>
      {item.isbn ? <Text style={styles.isbn}>{item.isbn}</Text> : null}

      {/* {item.condition &&
        item?.condition?.map((res: any) => (
          <Text style={styles.name}>{res}</Text>
        ))} */}

      {item.decay && (
        <Text style={styles.name}>
          {findDacayUsageValue(item.decay, 'decay')}
        </Text>
      )}
      {item.usage && (
        <Text style={styles.name}>
          {findDacayUsageValue(item.usage, 'usage')}
        </Text>
      )}

      <Text
        style={[
          styles.price,
          // eslint-disable-next-line react-native/no-inline-styles
          {marginLeft: myBook ? 0 : 10, alignSelf: myBook ? 'center' : 'auto'},
        ]}>
        €{addZeroes(item.price)}
      </Text>
    </View>
  </TouchableOpacity>
);

export default BooksCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.white,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: Theme.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    margin: 10,
    padding: 10,
    width: Dimensions.get('window').width / 2.25,
  },
  profile: {
    height: widthPixel(45),
    width: widthPixel(45),
    borderRadius: 9,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: Theme.darkPrimary,
    fontSize: fontPixel(15),
    fontWeight: '600',
    marginLeft: 10,
    width: widthPixel(120),
  },
  isbn: {
    color: Theme.darkPrimary,
    fontSize: fontPixel(15),
    marginLeft: 10,
    marginBottom: 5,
  },
  price: {
    color: Theme.darkPrimary,
    fontSize: fontPixel(15),
    fontWeight: '600',
    marginVertical: pixelSizeVertical(5),
  },
  bookImg: {
    marginVertical: pixelSizeVertical(12),
    height: heightPixel(160),
    width: widthPixel(116),
  },
});
