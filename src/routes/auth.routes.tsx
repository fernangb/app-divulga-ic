import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroAluno from '../pages/CadastroAluno';
import Login from '../pages/Login';
import ChooseProfile from '../pages/ChooseProfile';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
    }}
    // initialRouteName="Dashboard"
  >
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="CadastroAluno" component={CadastroAluno} />
    <Auth.Screen name="ChooseProfile" component={ChooseProfile} />
  </Auth.Navigator>
);

export default AuthRoutes;
