import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import ChooseProfile from '../pages/ChooseProfile';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
    }}
    initialRouteName="ChooseProfile"
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="ChooseProfile" component={ChooseProfile} />
  </Auth.Navigator>
);

export default AuthRoutes;
