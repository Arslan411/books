import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
// import AuthStack from './src/Screens/Auth/AuthStack';
import AppStack from './src/Navigations/MainStack';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './src/Redux/store';
import Toast from 'react-native-toast-message';

const AdditionalConfiguration = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} animated={true} />
      {/* <AuthStack /> */}

      <AppStack />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <>
      <StoreProvider store={store}>
        <NavigationContainer>
          <AdditionalConfiguration />
        </NavigationContainer>
      </StoreProvider>
      <Toast position="top" topOffset={20} />
    </>
  );
};

export default App;
