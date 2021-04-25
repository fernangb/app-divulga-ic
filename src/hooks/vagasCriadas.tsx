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

  return (
    <VagasContext.Provider
      value={{ vagasCriadas, handleSetVagasCriadas, atualizarVagasCriadas }}
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
