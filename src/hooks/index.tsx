import React from 'react';
import { AlunosInscritosProvider } from './alunosInscritos';
import { AreasProvider } from './areas';
import { AuthProvider } from './auth';
import { CursosProvider } from './cursos';
import { LaboratoriosProvider } from './laboratorios';
import { VagasCriadasProvider } from './vagasCriadas';
import { VagasRecomendadasProvider } from './vagasRecomendadas';

const AppProvider: React.FC = ({ children }) => (
  <>
    <AuthProvider>
      <VagasCriadasProvider>
        <VagasRecomendadasProvider>
          <AlunosInscritosProvider>
            <CursosProvider>
              <AreasProvider>
                <LaboratoriosProvider>{children}</LaboratoriosProvider>
              </AreasProvider>
            </CursosProvider>
          </AlunosInscritosProvider>
        </VagasRecomendadasProvider>
      </VagasCriadasProvider>
    </AuthProvider>
  </>
);

export default AppProvider;
