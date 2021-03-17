import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardAluno from '../pages/DashboardAluno';
import CriarVaga from '../pages/CriarVaga';
import DashboardProfessor from '../pages/DashboardProfessor';
import { useAuth } from '../hooks/auth';
import PesquisarVaga from '../pages/PesquisarVaga';
import PerfilAluno from '../pages/PerfilAluno';
import MenuAluno from '../pages/MenuAluno';
import MinhasInscricoes from '../pages/MinhasInscricoes';
import ConfirmarInscricaoVaga from '../pages/ConfirmarInscricaoVaga';
import CancelarInscricaoVaga from '../pages/CancelarInscricaoVaga';

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
      <App.Screen name="MenuAluno" component={MenuAluno} />
      <App.Screen name="PerfilAluno" component={PerfilAluno} />
      <App.Screen
        name="ConfirmarInscricaoVaga"
        component={ConfirmarInscricaoVaga}
      />
      <App.Screen
        name="CancelarInscricaoVaga"
        component={CancelarInscricaoVaga}
      />
      <App.Screen name="MinhasInscricoes" component={MinhasInscricoes} />
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
      <App.Screen name="MenuAluno" component={MenuAluno} />
      <App.Screen name="PerfilAluno" component={PerfilAluno} />
      <App.Screen
        name="ConfirmarInscricaoVaga"
        component={ConfirmarInscricaoVaga}
      />
      <App.Screen
        name="CancelarInscricaoVaga"
        component={CancelarInscricaoVaga}
      />
      <App.Screen name="MinhasInscricoes" component={MinhasInscricoes} />
    </App.Navigator>
  );
};

export default AppRoutes;
