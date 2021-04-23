import React from 'react';
import { AreasProvider } from './areas';
import { AuthProvider } from './auth';
import { CursosProvider } from './cursos';

const AppProvider: React.FC = ({ children }) => (
  <>
    <AuthProvider>
      <CursosProvider>
        <AreasProvider>{children}</AreasProvider>
      </CursosProvider>
    </AuthProvider>
  </>
);

export default AppProvider;
