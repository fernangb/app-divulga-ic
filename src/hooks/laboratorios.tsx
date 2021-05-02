/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface LaboratoriosContextData {
  laboratoriosSelecionados: string[];
  handleSetLaboratoriosSelecionados(nomes: string[]): void;
}

const LaboratoriosContext = createContext<LaboratoriosContextData>(
  {} as LaboratoriosContextData,
);

const LaboratoriosProvider: React.FC = ({ children }) => {
  const [laboratoriosSelecionados, setLaboratoriosSelecionados] = useState<
    string[]
  >([]);

  const handleSetLaboratoriosSelecionados = useCallback((nomes: string[]) => {
    setLaboratoriosSelecionados(nomes);
  }, []);

  return (
    <LaboratoriosContext.Provider
      value={{ laboratoriosSelecionados, handleSetLaboratoriosSelecionados }}
    >
      {children}
    </LaboratoriosContext.Provider>
  );
};

function useLaboratorios(): LaboratoriosContextData {
  const context = useContext(LaboratoriosContext);

  if (!context) {
    throw new Error(
      'useLaboratorios must be used within a LaboratoriosProvider',
    );
  }

  return context;
}

export { LaboratoriosProvider, useLaboratorios };
