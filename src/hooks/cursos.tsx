/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface CursosContextData {
  cursosSelecionados: string[];
  handleSetCursosSelecionados(nomes: string[]): void;
}

const CursosContext = createContext<CursosContextData>({} as CursosContextData);

const CursosProvider: React.FC = ({ children }) => {
  const [cursosSelecionados, setCursosSelecionados] = useState<string[]>([]);

  const handleSetCursosSelecionados = useCallback((nomes: string[]) => {
    setCursosSelecionados(nomes);
  }, []);

  return (
    <CursosContext.Provider
      value={{ cursosSelecionados, handleSetCursosSelecionados }}
    >
      {children}
    </CursosContext.Provider>
  );
};

function useCursos(): CursosContextData {
  const context = useContext(CursosContext);

  if (!context) {
    throw new Error('useCursos must be used within a CursosProvider');
  }

  return context;
}

export { CursosProvider, useCursos };
