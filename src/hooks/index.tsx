import React from 'react';
import { AlunosInscritosProvider } from './alunosInscritos';
import { AreasProvider } from './areas';
import { AuthProvider } from './auth';
import { CursosProvider } from './cursos';
import { VagasCriadasProvider } from './vagasCriadas';

const AppProvider: React.FC = ({ children }) => (
  <>
    <AuthProvider>
      <VagasCriadasProvider>
        <AlunosInscritosProvider>
          <CursosProvider>
            <AreasProvider>{children}</AreasProvider>
          </CursosProvider>
        </AlunosInscritosProvider>
      </VagasCriadasProvider>
    </AuthProvider>
  </>
);

export default AppProvider;
