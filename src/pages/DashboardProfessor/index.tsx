import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container, VagasList, VagasListTitle } from './styles';

import Header from '../../components/Header';

import AlunoCard from '../../components/AlunoCard';
import { IInscricao } from '../../interfaces/IInscricao';
import { useAuth } from '../../hooks/auth';

const DashboardProfessor: React.FC = () => {
  const [inscricoes, setInscricoes] = useState<IInscricao[]>([]);
  const { professor } = useAuth();

  useEffect(() => {
    async function loadData() {
      await api
        .get(`/inscricoes_ic/professor/${professor.id}`)
        .then(response => {
          setInscricoes(response.data);
        });
    }

    loadData();
  }, [professor]);

  return (
    <Container>
      <Header />
      <VagasList
        keyExtractor={inscricao => inscricao.id}
        data={inscricoes}
        ListHeaderComponent={<VagasListTitle>Alunos inscritos</VagasListTitle>}
        renderItem={({ item: inscricao }) => (
          <AlunoCard
            inscricao={inscricao}
            // onPress={() => navigateToProcurarVagas(vaga.id)}
          />
        )}
      />
    </Container>
  );
};

export default DashboardProfessor;
