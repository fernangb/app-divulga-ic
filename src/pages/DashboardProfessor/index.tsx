import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container, VagasList, VagasListTitle } from './styles';

import Header from '../../components/Header';

import VagaCard from '../../components/VagaCard';
import { IVaga } from '../../interfaces/IVaga';

const DashboardProfessor: React.FC = () => {
  const [vagas, setVagas] = useState<IVaga[]>([]);

  useEffect(() => {
    api.get('/vagas_ic/professor/me').then(response => {
      setVagas(response.data);
    });
  }, []);

  return (
    <Container>
      <Header />
      <VagasList
        keyExtractor={vaga => vaga.id}
        data={vagas}
        ListHeaderComponent={<VagasListTitle>Vagas criadas</VagasListTitle>}
        renderItem={({ item: vaga }) => (
          <VagaCard
            vaga={vaga}
            // onPress={() => navigateToProcurarVagas(vaga.id)}
          />
        )}
      />
    </Container>
  );
};

export default DashboardProfessor;
