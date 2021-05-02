import React from 'react';
import { AlunosInscritosProvider } from './alunosInscritos';
import { AreasProvider } from './areas';
import { AuthProvider } from './auth';
import { CursosProvider } from './cursos';
import { LaboratoriosProvider } from './laboratorios';
import { VagasCriadasProvider } from './vagasCriadas';

const AppProvider: React.FC = ({ children }) => (
  <>
    <AuthProvider>
      <VagasCriadasProvider>
        <AlunosInscritosProvider>
          <CursosProvider>
            <AreasProvider>
              <LaboratoriosProvider>{children}</LaboratoriosProvider>
            </AreasProvider>
          </CursosProvider>
        </AlunosInscritosProvider>
      </VagasCriadasProvider>
    </AuthProvider>
  </>
);

export default AppProvider;
