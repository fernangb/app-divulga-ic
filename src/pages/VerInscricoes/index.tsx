import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { Container, InscricoesList, InscricoesListTitle } from './styles';

import Header from '../../components/Header';

import AlunoCard from '../../components/AlunoCard';
import { useAlunosInscritos } from '../../hooks/alunosInscritos';

interface RouteParams {
  vagaId: string;
}

const VerInscricoes: React.FC = () => {
  const { params } = useRoute();

  const { alunosInscritos, atualizarInscricoes } = useAlunosInscritos();

  const routeParams = params as RouteParams;

  useEffect(() => {
    async function loadData() {
      await api.get(`/inscricoes_ic/${routeParams.vagaId}`).then(response => {
        atualizarInscricoes(response.data);
      });
    }

    loadData();
  }, [atualizarInscricoes, routeParams.vagaId]);

  return (
    <Container>
      <Header />
      <InscricoesList
        keyExtractor={inscricao => inscricao.id}
        data={alunosInscritos}
        ListHeaderComponent={
          <InscricoesListTitle>
            Inscrições pendentes: {alunosInscritos.length}
          </InscricoesListTitle>
        }
        renderItem={({ item: inscricao }) => (
          <AlunoCard
            inscricao={inscricao}
            // onPress={() => navigateToProcurarInscricoes(vaga.id)}
          />
        )}
      />
    </Container>
  );
};

export default VerInscricoes;
