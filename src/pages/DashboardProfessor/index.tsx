import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container, VagasList, VagasListTitle } from './styles';

import Header from '../../components/Header';

import IVaga from '../../interfaces/IVaga';
import VagaCriadaCard from '../../components/VagaCriadaCard';

const DashboardProfessor: React.FC = () => {
  const [Vagas, setVagas] = useState<IVaga[]>([]);

  useEffect(() => {
    api.get('/vagas_ic/professor/me').then(response => {
      setVagas(response.data);
    });
  }, []);

  return (
    <Container>
      <Header />
      <VagasList
        keyExtractor={Vaga => Vaga.id}
        data={Vagas}
        ListHeaderComponent={
          <VagasListTitle>
            Minhas vagas de IC criadas: {Vagas.length}
          </VagasListTitle>
        }
        renderItem={({ item: Vaga }) => <VagaCriadaCard vaga={Vaga} />}
      />
    </Container>
  );
};

export default DashboardProfessor;
