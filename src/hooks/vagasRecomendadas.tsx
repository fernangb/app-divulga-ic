/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { useNavigation } from '@react-navigation/native';
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
  vagasRecomendadas: IVaga[];
  handleSetVagasRecomendadas(vagas: IVaga[]): void;
  atualizarVagasRecomendadas(): void;
}

const VagasContext = createContext<VagasContextData>({} as VagasContextData);

const VagasRecomendadasProvider: React.FC = ({ children }) => {
  const [vagasRecomendadas, setVagasRecomendadas] = useState<IVaga[]>([]);

  const handleSetVagasRecomendadas = useCallback((vagas: IVaga[]) => {
    setVagasRecomendadas(vagas);
  }, []);

  const atualizarVagasRecomendadas = useCallback(() => {
    api.get('/vagas_ic/aluno/me').then(response => {
      handleSetVagasRecomendadas(response.data);
    });
  }, [handleSetVagasRecomendadas]);

  return (
    <VagasContext.Provider
      value={{
        vagasRecomendadas,
        handleSetVagasRecomendadas,
        atualizarVagasRecomendadas,
      }}
    >
      {children}
    </VagasContext.Provider>
  );
};

function useVagasRecomendadas(): VagasContextData {
  const context = useContext(VagasContext);

  if (!context) {
    throw new Error(
      'useVagasRecomendadas must be used within a VagasRecomendadasProvider',
    );
  }

  return context;
}

export { VagasRecomendadasProvider, useVagasRecomendadas };
