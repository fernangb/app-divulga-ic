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

  return (
    <AreasContext.Provider
      value={{ areasSelecionadas, handleSetAreasSelecionadas }}
    >
      {children}
    </AreasContext.Provider>
  );
};

function useAreas(): AreasContextData {
  const context = useContext(AreasContext);

  if (!context) {
    throw new Error('useAreas must be used within a AreasProvider');
  }

  return context;
}

export { AreasProvider, useAreas };
