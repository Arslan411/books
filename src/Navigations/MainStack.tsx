import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from '../Screens/Auth/AuthStack';
import Splash from '../Screens/Splash/SplashScreen';
import UserStack from './UserStack';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="UserStack" component={UserStack} />
    </Stack.Navigator>
  );
};
export default AppStack;
