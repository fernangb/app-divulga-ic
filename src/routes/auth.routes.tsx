import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroAluno from '../pages/CadastroAluno';
import Login from '../pages/Login';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#f1faee' },
    }}
    // initialRouteName="Dashboard"
  >
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="CadastroAluno" component={CadastroAluno} />
  </Auth.Navigator>
);

export default AuthRoutes;
