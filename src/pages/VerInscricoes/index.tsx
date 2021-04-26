import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
import {
  Container,
  InscricoesList,
  InscricoesListTitle,
  TitleBox,
} from './styles';

import Header from '../../components/Header';

import AlunoCard from '../../components/AlunoCard';
import { useAlunosInscritos } from '../../hooks/alunosInscritos';
import { useVagasCriadas } from '../../hooks/vagasCriadas';

interface RouteParams {
  vagaId: string;
}

const VerInscricoes: React.FC = () => {
  const { params } = useRoute();
  const routeParams = params as RouteParams;

  const { alunosInscritos, atualizarInscricoes } = useAlunosInscritos();
  const {
    getNrVagas,
    getNrVagasPreenchidas,
    vagasCriadas,
    handleSetVagasCriadas,
  } = useVagasCriadas();
  const [nrVagasPreenchidas, setNrVagasPreenchidas] = useState(
    getNrVagasPreenchidas(routeParams.vagaId),
  );
  const [nrVagas, setNrVagas] = useState(getNrVagas(routeParams.vagaId));

  useEffect(() => {
    const vaga = vagasCriadas.find(v => v.id === routeParams.vagaId);

    if (vaga) {
      setNrVagasPreenchidas(vaga.nrSelecionados);
      setNrVagas(vaga.nrVagas);
    }
  }, [handleSetVagasCriadas, routeParams.vagaId, vagasCriadas]);

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
          <TitleBox>
            <InscricoesListTitle>
              Inscrições pendentes: {alunosInscritos.length}
            </InscricoesListTitle>
            <InscricoesListTitle>
              Vagas preenchidas: {nrVagasPreenchidas} / {nrVagas}
            </InscricoesListTitle>
          </TitleBox>
        }
        renderItem={({ item: inscricao }) => (
          <AlunoCard inscricao={inscricao} />
        )}
      />
    </Container>
  );
};

export default VerInscricoes;
