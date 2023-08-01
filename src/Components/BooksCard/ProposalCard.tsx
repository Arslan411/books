import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from 'react-native';
import Theme from '../../Utils/Theme';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import {addZeroes, findDacayUsageValue} from '../../Utils/functions';
import Images from '../../Utils/Images';

export type props = {
  onPress?: () => void;
  item?: any;
  disabled?: boolean;
};
const ProposalCard: FC<props> = ({onPress, item, disabled}) => (
  <TouchableOpacity
    style={[styles.container, {backgroundColor: Theme.darkPrimary}]}
    onPress={onPress}
    disabled={disabled}>
    <View style={styles.row}>
      <Image
        style={styles.profile}
        source={
          item?.userPhotoURL ? {uri: item?.userPhotoURL} : Images.profile1
        }
      />
      <Text style={styles.name}>{item?.firstName + '\n' + item?.lastName}</Text>
    </View>
    <View>
      <Text style={[styles.price]}>€{addZeroes(item.price)}</Text>
      <Text style={styles.usage}>
        {findDacayUsageValue(item.usage, 'decay')}
      </Text>
      <Text style={styles.usage}>
        {findDacayUsageValue(item.usage, 'usage')}
      </Text>
    </View>
  </TouchableOpacity>
);

export default ProposalCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.white,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: Theme.lightGrey,
    elevation: 5,
    margin: 10,
    padding: 10,
    width: Dimensions.get('window').width / 2.25,
  },
  profile: {
    height: 47,
    width: 47,
    borderRadius: 9,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: Theme.white,
    fontSize: fontPixel(15),
    fontWeight: '600',
    marginLeft: 10,
  },

  price: {
    color: Theme.white,
    fontSize: fontPixel(15),
    fontWeight: '600',
    marginVertical: pixelSizeVertical(0),
    marginTop: 10,
  },
  bookImg: {
    marginVertical: pixelSizeVertical(12),
    height: heightPixel(160),
    width: widthPixel(116),
  },
  usage: {
    color: Theme.white,
    fontSize: fontPixel(15),
    fontWeight: '600',
  },
});
