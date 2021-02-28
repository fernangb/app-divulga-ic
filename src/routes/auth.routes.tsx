import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroAluno from '../pages/CadastroAluno';
import Login from '../pages/Login';
import EscolherPerfil from '../pages/EscolherPerfil';
import CadastroProfessor from '../pages/CadastroProfessor';

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
    <Auth.Screen name="CadastroProfessor" component={CadastroProfessor} />
    <Auth.Screen name="CadastroAluno" component={CadastroAluno} />
    <Auth.Screen name="EscolherPerfil" component={EscolherPerfil} />
  </Auth.Navigator>
);

export default AuthRoutes;
