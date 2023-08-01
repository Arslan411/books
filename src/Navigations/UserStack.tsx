import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './TabNavigation';
import BooksDetails from '../Screens/BooksDetails/BooksDetails';
import BooksSell from '../Screens/BookSell/BookSell';
import BookCondition from '../Screens/BookSell/BookConditions';
import BookPhoto from '../Screens/BookSell/SelectBookPhoto';
import BookPrice from '../Screens/BookSell/BookPrice';
import EditProfile from '../Screens/Profile/EditProfile';
import SettingsStack from '../Screens/Settings/SettingsStack';
import Contact from '../Screens/BooksDetails/Contact';
import EditBookAdd from '../Screens/BooksDetails/EditBookAdd';
import ChatScreen from '../Screens/Chat/Chat';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Bottom" component={BottomNavigation} />
      <Stack.Screen name="BooksDetails" component={BooksDetails} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="EditBookAdd" component={EditBookAdd} />
      <Stack.Screen name="BookSell" component={BooksSell} />
      <Stack.Screen name="BookCondition" component={BookCondition} />
      <Stack.Screen name="BookPhoto" component={BookPhoto} />
      <Stack.Screen name="BookPrice" component={BookPrice} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SettingsStack" component={SettingsStack} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};
export default UserStack;
