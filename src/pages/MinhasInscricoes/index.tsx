import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container, InscricoesList, InscricoesListTitle } from './styles';

import Header from '../../components/Header';

import { IInscricao } from '../../interfaces/IInscricao';
import InscricaoCard from '../../components/InscricaoCard';

const MinhasInscricoes: React.FC = () => {
  const [inscricoes, setInscricoes] = useState<IInscricao[]>([]);

  useEffect(() => {
    api.get('/inscricoes_ic/me').then(response => {
      setInscricoes(response.data);
    });
  }, []);

  return (
    <Container>
      <Header />
      <InscricoesList
        keyExtractor={inscricao => inscricao.id}
        data={inscricoes}
        ListHeaderComponent={
          <InscricoesListTitle>Minhas Inscrições</InscricoesListTitle>
        }
        renderItem={({ item: inscricao }) => (
          <InscricaoCard inscricao={inscricao} />
        )}
      />
    </Container>
  );
};

export default MinhasInscricoes;
