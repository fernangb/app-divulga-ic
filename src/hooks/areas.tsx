/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AreasContextData {
  areasSelecionadas: string[];
  handleSetAreasSelecionadas(nomes: string[]): void;
}

const AreasContext = createContext<AreasContextData>({} as AreasContextData);

const AreasProvider: React.FC = ({ children }) => {
  const [areasSelecionadas, setAreasSelecionadas] = useState<string[]>([]);

  const handleSetAreasSelecionadas = useCallback((nomes: string[]) => {
    setAreasSelecionadas(nomes);
  }, []);

  useEffect(() => {
    console.log('MUDOU');
    console.log(areasSelecionadas);
  }, [areasSelecionadas]);

  return (
    <AreasContext.Provider
      value={{ areasSelecionadas, handleSetAreasSelecionadas }}
    >
      {children}
    </AreasContext.Provider>
  );
};

function useAreasSelecionadas(): AreasContextData {
  const context = useContext(AreasContext);

  if (!context) {
    throw new Error('useAreasSelecionadas must be used within a AreasProvider');
  }

  return context;
}

export { AreasProvider, useAreasSelecionadas };
