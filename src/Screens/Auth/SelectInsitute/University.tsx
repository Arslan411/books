import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Theme from '../../../Utils/Theme';
import Header from '../../../Components/Header/Header';

import Button from '../../../Components/Button/Button';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import DropDownSearch from '../../../Components/Search/DropdownSearch';
import {getAllRegion} from '../../../Utils/Json';
import {useDispatch, useSelector} from 'react-redux';
import {getSchool} from '../../../Redux/Reducers/Authentication/GetSchool';

const University = ({navigation, route}: any) => {
  const {isLoading} = useSelector((state: any) => state.insitutes);
  const [isRegion, setIsRegion] = useState('');
  const [region, setRegion] = useState(false);
  const [insitutes, setInsitutes] = useState([]);

  const dispatch = useDispatch<any>();

  const [isSelectedUni, setSelectedUni] = useState<any>('');
  const [university, setUniversity] = useState(false);

  const {t} = useTranslation('institute');

  const {registerData, edit} = route?.params;

  const userData = {
    ...registerData,
    schoolId: isSelectedUni?.intSchoolId,
    institute: isSelectedUni?.institute,
  };
  const handleSelectedRegion = (item: any) => {
    setIsRegion(item);
    setRegion(false);
  };

  const handleRegion = () => {
    setRegion(true);
  };

  const handleSelectedUni = (item: any) => {
    setSelectedUni(item);
    setUniversity(false);
  };

  const handleUniversity = () => {
    setUniversity(true);
  };

  useEffect(() => {
    const body = {
      region: isRegion,
    };
    if (isRegion) {
      dispatch(getSchool(body)).then((res: any) => {
        setInsitutes(res.payload.data);
      });
    }
  }, [isRegion, dispatch]);
  return (
    <View style={styles.constainer}>
      <View style={styles.headerView}>
        <Header logo backArrow />
      </View>

      <View style={styles.btnView}>
        {region ? (
          <View style={styles.searchList}>
            <DropDownSearch
              data={getAllRegion}
              onSelect={handleSelectedRegion}
              placeholder={'Search for a region'}
            />
          </View>
        ) : (
          <Button
            label={isRegion ? isRegion : t('selectRegion')}
            bgColor={isRegion ? Theme.primary : Theme.buttonColor}
            marginVertical={20}
            fontSize={fontPixel(21.355)}
            color={isRegion ? Theme.white : Theme.primary}
            onPress={() => handleRegion()}
            disabled={!university && !isLoading ? false : true}
            isLoading={isLoading}
          />
        )}

        {university ? (
          <DropDownSearch
            data={insitutes}
            onSelect={handleSelectedUni}
            placeholder={'Select University'}
            isObj
          />
        ) : (
          <Button
            label={
              isSelectedUni.institute
                ? isSelectedUni.institute.length > 33
                  ? `${isSelectedUni.institute.substring(0, 33)}... `
                  : isSelectedUni.institute
                : t('selectUniversity')
            }
            // label={isSelectedUni.institute ?? t('selectUniversity')}
            bgColor={isSelectedUni ? Theme.primary : Theme.buttonColor}
            marginVertical={20}
            fontSize={
              isSelectedUni?.institute?.length > 33
                ? fontPixel(16)
                : fontPixel(21.355)
            }
            color={isSelectedUni ? Theme.white : Theme.primary}
            onPress={() => handleUniversity()}
            disabled={!isLoading && isRegion && !region ? false : true}
          />
        )}
      </View>
      {isRegion && isSelectedUni ? (
        <Button
          label={t('Next')}
          color={Theme.primary}
          marginVertical={20}
          onPress={() =>
            navigation.navigate('SelectDegree', {
              userData,
              edit,
            })
          }
        />
      ) : null}
    </View>
  );
};

export default University;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  headerView: {
    height: heightPixel(200),
    justifyContent: 'flex-end',
  },
  btnView: {
    height: heightPixel(290),
    justifyContent: 'center',
  },
  searchList: {
    height: heightPixel(130),
    width: widthPixel(275),
    alignSelf: 'center',
    marginVertical: pixelSizeVertical(20),
    bottom: 10,
  },
});
