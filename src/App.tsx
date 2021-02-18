/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar} from 'react-native';
import Routes from './routes';
import {NavigationContainer} from '@react-navigation/native';

import AppProvider from './hooks';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#222680" />
      <AppProvider>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
