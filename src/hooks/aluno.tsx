/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

import { IAluno } from '../interfaces/IAluno';

interface AlunoState {
  aluno: IAluno;
}

interface AlunoContextData {
  aluno: IAluno;
  showAluno(user_id: string): Promise<void>;
}

const AlunoContext = createContext<AlunoContextData>({} as AlunoContextData);

const AlunoProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AlunoState>({} as AlunoState);

  const showAluno = useCallback(async (user_id: string) => {
    const response = await api.get(`/alunos/${user_id}`);
    setData(response.data);
  }, []);

  return (
    <AlunoContext.Provider value={{ aluno: data.aluno, showAluno }}>
      {children}
    </AlunoContext.Provider>
  );
};

function useAluno(): AlunoContextData {
  const context = useContext(AlunoContext);

  if (!context) {
    throw new Error('useAluno must be used within a AlunoProvider');
  }

  return context;
}

export { AlunoProvider, useAluno };
