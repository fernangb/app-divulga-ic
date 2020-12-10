import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#73a7b9" translucent />
    <View style={{ flex: 1, backgroundColor: '#73a7b9' }}>
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
