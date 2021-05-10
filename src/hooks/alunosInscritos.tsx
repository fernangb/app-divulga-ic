/* eslint-disable no-param-reassign */
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
import { useVagasCriadas } from './vagasCriadas';

interface AlunosInscritosContextData {
  alunosInscritos: IInscricao[];
  selecionarAluno(inscricao: IInscricao): void;
  eliminarAluno(inscricao: IInscricao): void;
  atualizarInscricoes(inscricoes: IInscricao[]): void;
}

const AlunosInscritosContext = createContext<AlunosInscritosContextData>(
  {} as AlunosInscritosContextData,
);

const AlunosInscritosProvider: React.FC = ({ children }) => {
  const [alunosInscritos, setAlunosInscritos] = useState<IInscricao[]>([]);
  const [todosAlunosSelecionados, setTodosAlunosSelecionados] = useState(false);
  const {
    atualizarNrAlunosInscritos,
    aumentarNrAlunosSelecionados,
    diminuirNrAlunosSelecionados,
    verificarVaga,
  } = useVagasCriadas();

  const atualizarInscricoes = useCallback((inscricoes: IInscricao[]) => {
    setAlunosInscritos(inscricoes);
  }, []);

  const eliminarAluno = useCallback(
    async (inscricao: IInscricao) => {
      await api
        .put(`/inscricoes_ic/eliminar/${inscricao.id}`)
        .then(response => {
          Alert.alert('Excluir vaga de IC', response.data.message);

          const novosAlunosInscritos = alunosInscritos.filter(
            inscricaoAluno => inscricaoAluno.id !== inscricao.id,
          );

          if (inscricao.esSelecionado) {
            diminuirNrAlunosSelecionados(inscricao.vagaIc.id);
          }

          atualizarNrAlunosInscritos(inscricao.vagaIc.id);
          setAlunosInscritos(novosAlunosInscritos);
        })
        .catch(err => {
          const { data } = err.response;
          Alert.alert('Erro ao excluir vaga de IC', data.message);
        });
    },
    [alunosInscritos, atualizarNrAlunosInscritos, diminuirNrAlunosSelecionados],
  );

  const selecionarAluno = useCallback(
    async (inscricao: IInscricao) => {
      await api
        .put(`/inscricoes_ic/selecionar/${inscricao.id}`)
        .then(response => {
          const alunosAtualizado = alunosInscritos.map(alunoInscrito => {
            if (alunoInscrito.id === inscricao.id)
              alunoInscrito.esSelecionado = true;

            return alunoInscrito;
          });

          aumentarNrAlunosSelecionados(inscricao.vagaIc.id);
          setAlunosInscritos(alunosAtualizado);
          Alert.alert('Selecionar aluno', response.data.message, [
            { text: 'Ok', onPress: () => verificarVaga(inscricao.vagaIc.id) },
          ]);
        })
        .catch(err => {
          const { data } = err.response;
          Alert.alert('Erro ao excluir vaga de IC', data.message);
        });
    },
    [alunosInscritos, aumentarNrAlunosSelecionados, verificarVaga],
  );
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
