import React from 'react';
import { AreasProvider } from './areas';
import { AuthProvider } from './auth';
import { CursosProvider } from './cursos';
import { VagasCriadasProvider } from './vagasCriadas';

const AppProvider: React.FC = ({ children }) => (
  <>
    <AuthProvider>
      <VagasCriadasProvider>
        <CursosProvider>
          <AreasProvider>{children}</AreasProvider>
        </CursosProvider>
      </VagasCriadasProvider>
    </AuthProvider>
  </>
);

export default AppProvider;
