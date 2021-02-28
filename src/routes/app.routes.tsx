import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardAluno from '../pages/DashboardAluno';
import CriarVaga from '../pages/CriarVaga';
import EscolherPerfil from '../pages/EscolherPerfil';
import DashboardProfessor from '../pages/DashboardProfessor';
import { useAuth } from '../hooks/auth';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <App.Navigator
      screenOptions={{
        // headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      {user.nivel.nome === 'professor' ? (
        <App.Screen name="DashboardProfessor" component={DashboardProfessor} />
      ) : (
        <App.Screen name="DashboardAluno" component={DashboardAluno} />
      )}
      <App.Screen name="CriarVaga" component={CriarVaga} />
      {/* <App.Screen name="EscolherPerfil" component={EscolherPerfil} /> */}
    </App.Navigator>
  );
};

export default AppRoutes;
