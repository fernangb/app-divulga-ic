/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import { IInscricao } from '../interfaces/IInscricao';
import api from '../services/api';

interface AlunosInscritosContextData {
  alunosInscritos: IInscricao[];
  selecionarAluno(inscricaoId: string): void;
  eliminarAluno(inscricaoId: string): void;
  atualizarInscricoes(inscricoes: IInscricao[]): void;
}

const AlunosInscritosContext = createContext<AlunosInscritosContextData>(
  {} as AlunosInscritosContextData,
);

const AlunosInscritosProvider: React.FC = ({ children }) => {
  const [alunosInscritos, setAlunosInscritos] = useState<IInscricao[]>([]);

  const atualizarInscricoes = useCallback((inscricoes: IInscricao[]) => {
    setAlunosInscritos(inscricoes);
  }, []);

  const eliminarAluno = useCallback(
    async (inscricaoId: string) => {
      await api
        .put(`/inscricoes_ic/${inscricaoId}`)
        .then(response => {
          Alert.alert('Excluir vaga de IC', response.data.message);

          const novosAlunosInscritos = alunosInscritos.filter(
            inscricao => inscricao.id !== inscricaoId,
          );

          setAlunosInscritos(novosAlunosInscritos);
        })
        .catch(err => {
          const { data } = err.response;
          Alert.alert('Erro ao excluir vaga de IC', data.message);
        });
    },
    [alunosInscritos],
  );

  const selecionarAluno = useCallback(() => {}, []);

  return (
    <AlunosInscritosContext.Provider
      value={{
        alunosInscritos,
        eliminarAluno,
        selecionarAluno,
        atualizarInscricoes,
      }}
    >
      {children}
    </AlunosInscritosContext.Provider>
  );
};

function useAlunosInscritos(): AlunosInscritosContextData {
  const context = useContext(AlunosInscritosContext);

  if (!context) {
    throw new Error(
      'useAlunosInscritos must be used within a AlunosInscritosProvider',
    );
  }

  return context;
}

export { AlunosInscritosProvider, useAlunosInscritos };
