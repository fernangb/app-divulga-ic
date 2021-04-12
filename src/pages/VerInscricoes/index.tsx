import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { Container, InscricoesList, InscricoesListTitle } from './styles';

import Header from '../../components/Header';

import AlunoCard from '../../components/AlunoCard';
import { IInscricao } from '../../interfaces/IInscricao';

interface RouteParams {
  vagaId: string;
}

const VerInscricoes: React.FC = () => {
  const { params } = useRoute();

  const [inscricoes, setInscricoes] = useState<IInscricao[]>([]);

  const routeParams = params as RouteParams;

  useEffect(() => {
    async function loadData() {
      await api.get(`/inscricoes_ic/${routeParams.vagaId}`).then(response => {
        setInscricoes(response.data);
      });
    }

    loadData();
  }, [routeParams.vagaId]);

  return (
    <Container>
      <Header />
      <InscricoesList
        keyExtractor={inscricao => inscricao.id}
        data={inscricoes}
        ListHeaderComponent={
          <InscricoesListTitle>
            Inscrições pendentes: {inscricoes.length}
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
