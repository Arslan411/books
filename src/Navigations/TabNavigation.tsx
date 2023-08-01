import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import Icons from '../Constants/icons';
import Home from '../Screens/HomeScreen/Home';
import Books from '../Screens/Books/Books';
import Profile from '../Screens/Profile/Profile';
import Inbox from '../Screens/Chat/Inbox';

const Tab = createBottomTabNavigator();
export default function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,

        tabBarItemStyle: {
          //   alignItems: 'center',
        },
        tabBarStyle: {
          height: 60,
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              // eslint-disable-next-line react-native/no-inline-styles
              <View style={{height: 15, width: 1}}>
                <Image source={focused ? Icons.homeFocused : Icons.home} />
              </View>
            );
          },
        }}
        name="Home"
        component={Home}
      />

      <Tab.Screen
        options={{
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              // eslint-disable-next-line react-native/no-inline-styles
              <View style={{height: 15, width: 2}}>
                <Image source={focused ? Icons.bookFocused : Icons.book} />
              </View>
            );
          },
        }}
        name="Books"
        component={Books}
      />
      <Tab.Screen
        options={{
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              // eslint-disable-next-line react-native/no-inline-styles
              <View style={{height: 15, width: 15}}>
                <Image source={focused ? Icons.chatFocused : Icons.chat} />
              </View>
            );
          },
        }}
        name="Inbox"
        component={Inbox}
      />

      <Tab.Screen
        options={{
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              // eslint-disable-next-line react-native/no-inline-styles
              <View style={{height: 15, width: 50}}>
                <Image
                  source={focused ? Icons.profileFocused : Icons.profile}
                />
              </View>
            );
          },
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
