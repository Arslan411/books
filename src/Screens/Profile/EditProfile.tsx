import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Theme from '../../Utils/Theme';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '../../Utils/Normalization';
import {useTranslation} from 'react-i18next';
import Images from '../../Utils/Images';
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import {launchImageLibrary} from 'react-native-image-picker';
import {Formik} from 'formik';
import Input from '../../Components/Input/Input';
import {profileValidation} from '../../Utils/validation';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../Redux/Reducers/User/ProfileSlice';
import Loader from '../../Components/Loader/Loader';
import Toast from 'react-native-toast-message';
import DropDownSearch from '../../Components/Search/DropdownSearch';
import {randomNameGenerator} from '../../Utils/functions';

const EditProfile = ({navigation, route}: any) => {
  const {userProfileState} = useSelector((state: any) => state.profile);
  const {isLoading} = useSelector((state: any) => state.profile);
  const {t} = useTranslation('profile');
  const gradeArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const [isSelectedGrade, setSelectedGrade] = useState();
  const [grade, setGrade] = useState(false);
  const [isSelectedImages, setSelectedImages] = useState([
    {
      uri: Image.resolveAssetSource(Images.profile1)?.uri.split('?')[0],
      type: 'png',
      default: true,
    },
  ]);
  console.log('isSelectedIddmages', isSelectedImages);
  const {userProfile, userData, schoolData} = route?.params;
  const dispatch = useDispatch<any>();

  function handleProfileData(val: any) {
    const formData = new FormData();
    // formData.append('id', '');
    formData.append('insta', val.insta);
    formData.append(
      'intSchoolId',
      userData?.schoolId ?? userProfileState.intSchoolId,
    );
    formData.append('grade', isSelectedGrade);
    if (!isSelectedImages[0]?.default) {
      formData.append('photo', {
        uri: isSelectedImages[0]?.uri,
        type: isSelectedImages[0]?.type,
        name:
          'profile_' +
          randomNameGenerator() +
          '.' +
          isSelectedImages[0]?.type.split('/')[1],
      });
    }

    formData.append('photo', '');

    if (userData?.section) {
      formData.append(
        'section',
        userData?.section ? userData?.section : userProfileState?.section,
      );
    } else {
      formData.append('course', val.program ? val?.program : userData?.degree);
    }

    dispatch(updateProfile(formData)).then((res: any) => {
      if (res.payload?.data) {
        Toast.show({
          type: 'success',
          text1: 'Profile updated',
        });
        navigation.goBack();
      }
    });
  }

  const handleImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    const result = await launchImageLibrary(options);
    setSelectedImages(result.assets);
  };

  const initialValues = {
    name: userProfile?.firstName,
    surName: userProfile?.lastName,
    insta: userProfile?.insta ?? '@',
    program: userProfile?.course ?? '',
    section: userProfile?.section ?? '',
  };

  useEffect(() => {
    setSelectedGrade(userProfileState?.grade);
  }, [userProfileState]);

  const handleSelectedGrade = (item: any) => {
    setSelectedGrade(item);
    setGrade(false);
  };
  const handleGrade = () => {
    setGrade(true);
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={styles.loader}>
          <Loader color={Theme.primary} />
        </View>
      ) : (
        <View>
          <Header backArrow />
          <TouchableOpacity
            style={styles.profile}
            onPress={() => handleImagePicker()}>
            {!isSelectedImages[0]?.default ? (
              <Image
                style={styles.profile}
                source={{uri: isSelectedImages[0]?.uri}}
              />
            ) : (
              <Image
                style={styles.profile}
                source={
                  userProfile?.photoURL
                    ? {uri: userProfile?.photoURL}
                    : Images.profile1
                }
              />
            )}
          </TouchableOpacity>

          <View>
            <Formik
              initialValues={initialValues}
              onSubmit={handleProfileData}
              validationSchema={profileValidation}>
              {({handleSubmit, handleChange, values, errors, touched}) => (
                <>
                  <Input
                    label={t('name')}
                    field
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />

                  {touched.name && errors.name ? (
                    <Text style={styles.error}>{errors.name}</Text>
                  ) : null}

                  <Input
                    label={t('surName')}
                    field
                    value={values.surName}
                    onChangeText={handleChange('surName')}
                  />

                  {touched.surName && errors.surName ? (
                    <Text style={styles.error}>{errors.surName}</Text>
                  ) : null}

                  <Input
                    label={t('insta')}
                    field
                    value={values.insta}
                    onChangeText={handleChange('insta')}
                  />

                  {userProfile?.course && (
                    <Input
                      label={t('program')}
                      field
                      value={values.program}
                      onChangeText={handleChange('program')}
                    />
                  )}

                  {touched.program && errors.program ? (
                    <Text style={styles.error}>{errors.program}</Text>
                  ) : null}

                  <Button
                    label={schoolData?.institute ?? userData.institute}
                    marginVertical={pixelSizeVertical(20)}
                    onPress={() =>
                      navigation.navigate('AuthStack', {
                        screen: 'SelectInsitute',
                        params: {
                          edit: true,
                          registerData: '',
                        },
                      })
                    }
                    bgColor={Theme.buttonColor}
                    color={Theme.primary}
                    fontSize={fontPixel(21)}
                    fontWeight={'400'}
                  />

                  {grade ? (
                    <View style={styles.searchList}>
                      <DropDownSearch
                        data={gradeArr}
                        onSelect={handleSelectedGrade}
                        placeholder={'Search for a year'}
                      />
                    </View>
                  ) : (
                    <Button
                      label={
                        isSelectedGrade
                          ? `${isSelectedGrade} ${t('year')}`
                          : userData?.grade
                          ? `${userData?.grade} ${t('year')}`
                          : `${userProfile?.grade} ${t('year')}`
                      }
                      bgColor={
                        isSelectedGrade ? Theme.primary : Theme.buttonColor
                      }
                      marginVertical={20}
                      fontSize={fontPixel(21.355)}
                      color={isSelectedGrade ? Theme.white : Theme.primary}
                      onPress={() => handleGrade()}
                    />
                  )}
                  <Button
                    label={t('save')}
                    marginVertical={pixelSizeVertical(20)}
                    onPress={handleSubmit}
                    color={Theme.primary}
                  />
                </>
              )}
            </Formik>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  profile: {
    borderRadius: 10,
    alignSelf: 'center',
    bottom: 20,
    height: heightPixel(85),
    width: widthPixel(85),
    resizeMode: 'contain',
  },
  error: {
    color: Theme.errorColor,
    padding: 5,
    fontSize: 14,
    marginTop: 1,
    marginBottom: 5,
    marginLeft: '4%',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPixel(900),
  },
  searchList: {
    height: 100,
    width: 275,
    alignSelf: 'center',
    marginVertical: pixelSizeHorizontal(30),
  },
});
