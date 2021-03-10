import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardAluno from '../pages/DashboardAluno';
import CriarVaga from '../pages/CriarVaga';
import DashboardProfessor from '../pages/DashboardProfessor';
import { useAuth } from '../hooks/auth';
import PesquisarVaga from '../pages/PesquisarVaga';
import Perfil from '../pages/Perfil';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return user.nivel.nome === 'professor' ? (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <App.Screen name="DashboardProfessor" component={DashboardProfessor} />
      <App.Screen name="CriarVaga" component={CriarVaga} />
      <App.Screen name="PesquisarVaga" component={PesquisarVaga} />
      <App.Screen name="Perfil" component={Perfil} />
    </App.Navigator>
  ) : (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <App.Screen name="DashboardAluno" component={DashboardAluno} />
      <App.Screen name="CriarVaga" component={CriarVaga} />
      <App.Screen name="PesquisarVaga" component={PesquisarVaga} />
      <App.Screen name="Perfil" component={Perfil} />
    </App.Navigator>
  );
};

export default AppRoutes;
