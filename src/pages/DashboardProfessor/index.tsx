import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container, VagasList, VagasListTitle } from './styles';

import Header from '../../components/Header';

import IVaga from '../../interfaces/IVaga';
import VagaCriadaCard from '../../components/VagaCriadaCard';

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
        ListHeaderComponent={
          <VagasListTitle>
            Minhas vagas de IC criadas: {vagas.length}
          </VagasListTitle>
        }
        renderItem={({ item: vaga }) => <VagaCriadaCard vaga={vaga} />}
      />
    </Container>
  );
};

export default DashboardProfessor;
