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
import IVaga from '../interfaces/IVaga';
import api from '../services/api';

interface VagasContextData {
  vagasCriadas: IVaga[];
  handleSetVagasCriadas(vagas: IVaga[]): void;
  atualizarVagasCriadas(): void;
  atualizarNrAlunosInscritos(id: string): void;
  atualizarNrAlunosSelecionados(id: string): void;
  getNrVagasPreenchidas(id: string): number;
  getNrVagas(id: string): number;
}

const VagasContext = createContext<VagasContextData>({} as VagasContextData);

const VagasCriadasProvider: React.FC = ({ children }) => {
  const [vagasCriadas, setVagasCriadas] = useState<IVaga[]>([]);

  const handleSetVagasCriadas = useCallback((vagas: IVaga[]) => {
    setVagasCriadas(vagas);
  }, []);

  const atualizarVagasCriadas = useCallback(() => {
    api.get('/vagas_ic/professor/me').then(response => {
      handleSetVagasCriadas(response.data);
    });
  }, [handleSetVagasCriadas]);

  const atualizarNrAlunosInscritos = useCallback(
    (id: string) => {
      const novasVagas = vagasCriadas.map(vaga => {
        if (vaga.id === id) vaga.nrInscritos -= 1;

        return vaga;
      });

      setVagasCriadas(novasVagas);
    },
    [vagasCriadas],
  );

  const atualizarNrAlunosSelecionados = useCallback(
    (id: string) => {
      const vagasAtualizadas = vagasCriadas.map(vaga => {
        if (vaga.id === id) vaga.nrSelecionados += 1;

        return vaga;
      });

      setVagasCriadas(vagasAtualizadas);
    },
    [vagasCriadas],
  );

  const getNrVagasPreenchidas = useCallback(
    (id: string): number => {
      const vagaEncontrada = vagasCriadas.find(vaga => vaga.id === id);

      if (!vagaEncontrada) return 0;

      return vagaEncontrada.nrSelecionados;
    },
    [vagasCriadas],
  );

  const getNrVagas = useCallback(
    (id: string): number => {
      const vagaEncontrada = vagasCriadas.find(vaga => vaga.id === id);

      if (!vagaEncontrada) return 0;

      return vagaEncontrada.nrVagas;
    },
    [vagasCriadas],
  );

  return (
    <VagasContext.Provider
      value={{
        vagasCriadas,
        handleSetVagasCriadas,
        atualizarVagasCriadas,
        atualizarNrAlunosInscritos,
        atualizarNrAlunosSelecionados,
        getNrVagasPreenchidas,
        getNrVagas,
      }}
    >
      {children}
    </VagasContext.Provider>
  );
};

function useVagasCriadas(): VagasContextData {
  const context = useContext(VagasContext);

  if (!context) {
    throw new Error(
      'useVagasCriadas must be used within a VagasCriadasProvider',
    );
  }

  return context;
}

export { VagasCriadasProvider, useVagasCriadas };
