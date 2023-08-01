import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Theme from '../../../Utils/Theme';
import Header from '../../../Components/Header/Header';

import Button from '../../../Components/Button/Button';
import DropDownSearch from '../../../Components/Search/DropdownSearch';
import {useDispatch, useSelector} from 'react-redux';

import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import {getCities} from '../../../Redux/Reducers/Authentication/GetCitiesSlice';
import {getAllRegion} from '../../../Utils/Json';
import {getSchool} from '../../../Redux/Reducers/Authentication/GetSchool';

const HighSchool = ({navigation, route}: any) => {
  const {isLoading} = useSelector((state: any) => state.cities);
  const [isRegion, setIsRegion] = useState('');
  const [region, setRegion] = useState(false);

  const [isSelectedCity, setSelectedCity] = useState('');
  const [city, setCity] = useState(false);
  const [getAllCities, setAllCities] = useState([]);
  const [isSelectedSchool, setSelectedSchool] = useState<any>('');
  const [school, setSchool] = useState(false);
  const [insitutes, setInsitutes] = useState([]);

  const {t} = useTranslation('institute');
  const dispatch = useDispatch<any>();

  const {registerData, edit} = route?.params;

  const userData = {
    ...registerData,
    schoolId: isSelectedSchool?.intSchoolId,
    institute: isSelectedSchool?.institute,
  };

  useEffect(() => {
    const body = {
      region: isRegion,
    };
    if (isRegion) {
      dispatch(getCities(body)).then((res: any) => {
        setAllCities(res.payload.data.cities);
      });
    }
  }, [isRegion, dispatch]);

  useEffect(() => {
    const body = {
      region: isRegion,
      city: isSelectedCity,
    };

    if (isRegion) {
      dispatch(getSchool(body)).then((res: any) => {
        setInsitutes(res.payload.data);
      });
    }
  }, [isRegion, dispatch, isSelectedCity]);

  function handleSelectedRegion(item: any): void {
    setIsRegion(item);
    setRegion(false);
  }

  const handleRegion = () => {
    setRegion(true);
  };

  const handleSelectedCity = (item: any) => {
    setSelectedCity(item);
    setCity(false);
  };

  const handleCity = () => {
    setCity(true);
  };

  const handleSelectedSchool = (item: any) => {
    setSelectedSchool(item);
    setSchool(false);
  };
  const handleSchool = () => {
    setSchool(true);
  };

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
              isObj={false}
            />
          </View>
        ) : (
          <Button
            label={isRegion ? isRegion : t('selectRegion')}
            bgColor={isRegion ? Theme.primary : Theme.buttonColor}
            marginVertical={25}
            fontSize={fontPixel(21.355)}
            color={isRegion ? Theme.white : Theme.primary}
            onPress={() => handleRegion()}
            disabled={!school && !city && !isLoading ? false : true}
            isLoading={isLoading}
          />
        )}

        {city ? (
          <View style={styles.searchList}>
            <DropDownSearch
              data={getAllCities}
              onSelect={handleSelectedCity}
              placeholder={'Select City'}
              isObj={false}
            />
          </View>
        ) : (
          <Button
            label={isSelectedCity ? isSelectedCity : t('city')}
            bgColor={isSelectedCity ? Theme.primary : Theme.buttonColor}
            marginVertical={25}
            fontSize={fontPixel(21.355)}
            color={isSelectedCity ? Theme.white : Theme.primary}
            onPress={() => handleCity()}
            disabled={
              !isLoading && isRegion && !region && !school ? false : true
            }
          />
        )}

        {school ? (
          <View style={styles.searchList}>
            <DropDownSearch
              data={insitutes}
              isObj={true}
              onSelect={handleSelectedSchool}
              placeholder={'Select School'}
            />
          </View>
        ) : (
          <Button
            label={
              isSelectedSchool.institute
                ? isSelectedSchool.institute.length > 33
                  ? `${isSelectedSchool.institute.substring(0, 33)}... `
                  : isSelectedSchool.institute
                : t('school')
            }
            bgColor={isSelectedSchool ? Theme.primary : Theme.buttonColor}
            marginVertical={25}
            fontSize={
              isSelectedSchool?.institute?.length > 33
                ? fontPixel(16)
                : fontPixel(21.355)
            }
            color={isSelectedSchool ? Theme.white : Theme.primary}
            onPress={() => handleSchool()}
            disabled={!isLoading && isRegion && !city && !region ? false : true}
          />
        )}
      </View>
      {isRegion && isSelectedCity && isSelectedSchool ? (
        <Button
          label={t('Next')}
          color={Theme.primary}
          marginVertical={pixelSizeVertical(50)}
          onPress={() =>
            navigation.navigate('SelectGrade', {
              userData,
              edit,
            })
          }
        />
      ) : null}
    </View>
  );
};

export default HighSchool;
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
    height: heightPixel(360),
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
