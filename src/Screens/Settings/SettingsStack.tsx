import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './Settings';
import ResearchSettings from './ResearchSettings';
import Language from './Language';
import ChangeEmailPassword from './ChangeEmailPassword';
import VerificationCode from './VerificationCode';
import SuccessfullyMessage from './SuccessfullyMessage';
import ContactUs from './ContactUs';
import DeleteAccount from './DeleteAccount';
import Instructions from './Instructions';

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ResearchSettings" component={ResearchSettings} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen
        name="ChangeEmailPassword"
        component={ChangeEmailPassword}
      />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen
        name="SuccessfullyMessage"
        component={SuccessfullyMessage}
      />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen name="Instructions" component={Instructions} />
    </Stack.Navigator>
  );
};
export default SettingsStack;
