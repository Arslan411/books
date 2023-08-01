import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import Theme from '../../Utils/Theme';

import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Images from '../../Utils/Images';
import Icons from '../../Constants/icons';
import Button from '../../Components/Button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserSchool,
  profileData,
} from '../../Redux/Reducers/User/ProfileSlice';
import {useIsFocused} from '@react-navigation/native';
// import Loader from '../../Components/Loader/Loader';

const Profile = ({navigation}: any) => {
  const [schoolData, setSchoolData] = useState([]);
  const {userProfileState} = useSelector((state: any) => state.profile);
  const {t} = useTranslation('profile');

  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(profileData());
  }, [dispatch, isFocused]);

  useEffect(() => {
    if (userProfileState) {
      const body = {
        intSchoolId: userProfileState?.intSchoolId,
      };

      dispatch(getUserSchool(body)).then((res: any) => {
        setSchoolData(res?.payload?.data);
      });
    }
  }, [userProfileState, dispatch]);

  return (
    <View style={styles.container}>
      <View>
        {/* BackgroundImage */}

        <ImageBackground
          imageStyle={styles.bgImg}
          source={
            schoolData?.photoURL2 ? schoolData?.photoURL2 : Images.bgProfile
          }>
          <View style={styles.imgView} />
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() =>
              navigation.navigate('SettingsStack', {
                screen: 'Setting',
              })
            }>
            <Image style={styles.settingIcon} source={Icons.settingIcon} />
          </TouchableOpacity>

          <Image style={styles.bgLogo} source={Images.bgLogo} />
          <View style={styles.position}>
            <View style={styles.row}>
              {userProfileState?.photoURL !== null ? (
                <Image
                  style={styles.logo}
                  source={{uri: userProfileState?.photoURL}}
                />
              ) : (
                <Image style={styles.logo} source={Images.profile2} />
              )}

              <Text style={styles.name}>
                {userProfileState?.firstName +
                  '\n' +
                  userProfileState?.lastName}
              </Text>
            </View>

            <Text style={styles.txt}>{schoolData?.institute}</Text>
            <Text style={styles.txt}>
              IG
              {userProfileState?.insta !== '@' || userProfileState?.insta !== ''
                ? userProfileState?.insta
                : '@unknown'}
            </Text>

            {userProfileState?.course ? (
              <Text style={styles.txt}>{userProfileState?.degree}</Text>
            ) : null}
          </View>
        </ImageBackground>

        <Button
          label={t('profile')}
          marginVertical={pixelSizeVertical(50)}
          onPress={() =>
            navigation.navigate('EditProfile', {
              userProfile: userProfileState,
              userData: '',
              schoolData,
            })
          }
        />
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },

  bgImg: {
    height: heightPixel(640),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  imgView: {
    height: heightPixel(640),
    backgroundColor: Theme.darkPrimary,
    opacity: 0.6,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bgLogo: {
    position: 'absolute',
    alignSelf: 'center',
    top: '22%',
  },
  logo: {
    alignSelf: 'center',
    borderRadius: 10,
    height: 80,
    width: 80,
  },

  settingIcon: {
    height: 28,
    width: 28,
  },
  iconBtn: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    alignSelf: 'flex-end',
    margin: 10,
    padding: 10,
    paddingRight: 15,
  },
  name: {
    color: Theme.white,
    fontSize: fontPixel(24),
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  position: {
    position: 'absolute',
    bottom: '13%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  txt: {
    color: Theme.white,
    fontSize: fontPixel(20),
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '400',
  },
});
