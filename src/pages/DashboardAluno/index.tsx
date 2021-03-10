/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Button } from 'react-native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  VagasList,
  VagasListTitle,
  Footer,
  LabButton,
  BuscaButton,
  InscricoesButton,
} from './styles';

import VagaCard from '../../components/VagaCard';

export interface IVagas {
  id: string;
  id_curso: string;
  id_area: string;
  id_professor: string;
  id_laboratorio: string;
  nome: string;
  descricao: string;
  vl_bolsa: number;
  hr_semana: number;
  cr_minimo: number;
  periodo_minimo: number;
  nr_vagas: number;
  laboratorio: { nome: string; sigla: string };
  professor: { usuario: { avatar_url: string } };
  avatar_url: string;
}

const DashboardAluno: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();
  const [vagas, setVagas] = useState<IVagas[]>([]);

  const navigateToPerfil = useCallback(() => {
    navigate('Menu');
  }, [navigate]);

  useEffect(() => {
    api.get('/vagas_ic/me').then(response => {
      setVagas(response.data);
    });
  }, []);

  const navigateToProcurarVagas = useCallback(
    (id: string) => {
      // console.log("Id1: ",id);
      // navigate('PesquisarVaga', { id });
      navigate('PesquisarVaga');
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Olá,
          {'\n'}
          <UserName>{user.nome}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToPerfil}>
          {/* <ProfileButton onPress={() => navigateToProcurarVagas(user.id)}> */}
          <UserAvatar
            source={{
              uri: user.avatar_url,
            }}
          />
        </ProfileButton>
      </Header>
      <VagasList
        keyExtractor={vaga => vaga.id}
        data={vagas}
        ListHeaderComponent={
          <VagasListTitle>Vagas Recomendadas</VagasListTitle>
        }
        renderItem={({ item: vaga }) => (
          <VagaCard
            vaga={vaga}
            onPress={() => navigateToProcurarVagas(vaga.id)}
          />
        )}
      />
      {/* <Footer>
        <LabButton onPress={() => {}}>
          <Icon
            name="filter"
            color="#f76769"
            size={36}
            style={{ transform: [{ rotateZ: '180deg' }] }}
          />
        </LabButton>
        <BuscaButton onPress={() => {}}>
          <Icon name="magnify" color="#f76769" size={36} />
        </BuscaButton>
        <InscricoesButton onPress={() => {}}>
          <Icon name="clipboard-list" color="#f76769" size={36} />
        </InscricoesButton>
      </Footer> */}
    </Container>
  );
};

export default DashboardAluno;
