import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardAluno from '../pages/DashboardAluno';
import CriarVaga from '../pages/CriarVaga';
import DashboardProfessor from '../pages/DashboardProfessor';
import { useAuth } from '../hooks/auth';
import PesquisarVaga from '../pages/PesquisarVaga';
import PerfilAluno from '../pages/PerfilAluno';
import MenuAluno from '../pages/MenuAluno';
import PerfilProfessor from '../pages/PerfilProfessor';
import MenuProfessor from '../pages/MenuProfessor';
import MinhasInscricoes from '../pages/MinhasInscricoes';
import ConfirmarInscricaoVaga from '../pages/ConfirmarInscricaoVaga';
import CancelarInscricaoVaga from '../pages/CancelarInscricaoVaga';
import VerInscricoes from '../pages/VerInscricoes';
import CursosCheckbox from '../components/CheckboxCursos';
import EditarVaga from '../pages/EditarVaga';
import AlterarSenha from '../pages/AlterarSenha';

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
      <App.Screen name="EditarVaga" component={EditarVaga} />
      <App.Screen name="PesquisarVaga" component={PesquisarVaga} />
      <App.Screen name="MenuProfessor" component={MenuProfessor} />
      <App.Screen name="AlterarSenha" component={AlterarSenha} />

      <App.Screen name="PerfilProfessor" component={PerfilProfessor} />
      <App.Screen
        name="ConfirmarInscricaoVaga"
        component={ConfirmarInscricaoVaga}
      />
      <App.Screen
        name="CancelarInscricaoVaga"
        component={CancelarInscricaoVaga}
      />
      <App.Screen name="VerInscricoes" component={VerInscricoes} />
      <App.Screen name="CursosCheckbox" component={CursosCheckbox} />
    </App.Navigator>
  ) : (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <App.Screen name="DashboardAluno" component={DashboardAluno} />
      <App.Screen name="PesquisarVaga" component={PesquisarVaga} />
      <App.Screen name="MenuAluno" component={MenuAluno} />
      <App.Screen name="PerfilAluno" component={PerfilAluno} />
      <App.Screen name="AlterarSenha" component={AlterarSenha} />
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
