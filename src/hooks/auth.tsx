/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import api from '../services/api';
import { IAluno } from '../interfaces/IAluno';
import { IProfessor } from '../interfaces/IProfessor';
import { IUsuario } from '../interfaces/IUsuario';
import { useVagasRecomendadas } from './vagasRecomendadas';

interface AuthState {
  token: string;
  user: IUsuario;
  aluno: IAluno;
  professor: IProfessor;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: IUsuario;
  aluno: IAluno;
  professor: IProfessor;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateAluno(aluno: IAluno): Promise<void>;
  updateProfessor(professor: IProfessor): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  const { atualizarVagasRecomendadas } = useVagasRecomendadas();

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user, aluno, professor] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
        '@GoBarber:aluno',
        '@GoBarber:professor',
      ]);

      if (token[1] && user[1] && aluno[1] && professor[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({
          token: token[1],
          user: JSON.parse(user[1]),
          aluno: JSON.parse(aluno[1]),
          professor: JSON.parse(professor[1]),
        });
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    await api
      .post('sessions', { email, password })
      .then(response => {
        const { user, token, aluno, professor } = response.data;

        AsyncStorage.multiSet([
          ['@GoBarber:token', token],
          ['@GoBarber:user', JSON.stringify(user)],
          ['@GoBarber:aluno', JSON.stringify(aluno)],
          ['@GoBarber:professor', JSON.stringify(professor)],
        ]);

        api.defaults.headers.authorization = `Bearer ${token}`;
        setData({ token, user, aluno, professor });
      })
      .catch(err => {
        const { data } = err.response;
        Alert.alert('Erro ao realizar login', data.message);
      });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as AuthState);
  }, []);

  const updateAluno = useCallback(
    async (aluno: IAluno) => {
      await AsyncStorage.setItem('@GoBarber:aluno', JSON.stringify(aluno));
      const { professor } = data;

      setData({ token: data.token, user: aluno.usuario, aluno, professor });
    },
    [data],
  );

  const updateProfessor = useCallback(
    async (professor: IProfessor) => {
      await AsyncStorage.setItem(
        '@GoBarber:professor',
        JSON.stringify(professor),
      );
      const { aluno } = data;

      setData({ token: data.token, user: professor.usuario, aluno, professor });
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        aluno: data.aluno,
        professor: data.professor,
        loading,
        signIn,
        signOut,
        updateAluno,
        updateProfessor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
