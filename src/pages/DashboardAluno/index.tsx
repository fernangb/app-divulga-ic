import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import {
  Container,
  Description,
  DescriptionBox,
  RedirectButton,
  RedirectButtonText,
  VagasList,
  VagasListTitle,
} from './styles';

import Header from '../../components/Header';

import VagaCard from '../../components/VagaCard';
import IVaga from '../../interfaces/IVaga';
import logoImg from '../../assets/logo1.png';

const DashboardAluno: React.FC = () => {
  const [vagas, setVagas] = useState<IVaga[]>([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('/vagas_ic/aluno/me').then(response => {
      setVagas(response.data);
    });
  }, []);

  const handlePesquisarVagas = useCallback(() => {
    navigate('PesquisarVaga');
  }, [navigate]);

  if (vagas.length === 0) {
    return (
      <Container>
        <Header />
        <DescriptionBox>
          <Image source={logoImg} />

          <Description>
            Não existe nenhuma vaga recomendada disponível no momento
          </Description>
          <RedirectButton onPress={handlePesquisarVagas}>
            <RedirectButtonText>Buscar por mais vagas</RedirectButtonText>
          </RedirectButton>
        </DescriptionBox>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <VagasList
        keyExtractor={vaga => vaga.id}
        data={vagas}
        ListHeaderComponent={
          <VagasListTitle>Vagas recomendadas: {vagas.length}</VagasListTitle>
        }
        renderItem={({ item: vaga }) => <VagaCard vaga={vaga} />}
      />
    </Container>
  );
};

export default DashboardAluno;
