import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';
import ImageSelection from './ImageSelection';
import EmailField from './ForgotPass/EmailSection';
import ResetPass from './ForgotPass/ResetPass';
import SelectInsitute from './SelectInsitute/SelectInsitute';
import VerifyEmail from './VerifyEmail';
import TermConditions from './Term&Conditions';
import WelcomeScreen from './WelcomeScreen';
import HighSchool from './SelectInsitute/HighSchool';
import University from './SelectInsitute/University';
import SelectGrade from './SelectInsitute/SelectGrade';
import SelectDegree from './SelectInsitute/SelectDegree';
import HaveLook from './Havealook';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="EmailSection" component={EmailField} />
      <Stack.Screen name="ResetPass" component={ResetPass} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ImageSelection" component={ImageSelection} />
      <Stack.Screen name="SelectInsitute" component={SelectInsitute} />
      <Stack.Screen name="HighSchool" component={HighSchool} />
      <Stack.Screen name="SelectGrade" component={SelectGrade} />
      <Stack.Screen name="University" component={University} />
      <Stack.Screen name="SelectDegree" component={SelectDegree} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="TermConditions" component={TermConditions} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="HaveLook" component={HaveLook} />
    </Stack.Navigator>
  );
};
export default AuthStack;
