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
  VagaCard,
  VagaAvatar,
  VagaInfo,
  VagaNome,
  VagaMeta,
  VagaMetaText,
  VagasListTitle,
} from './styles';

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
}

const DashboardAluno: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();
  const [vagas, setVagas] = useState<IVagas[]>([]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  useEffect(() => {
    api.get('/vagas_ic/me').then(response => {
      setVagas(response.data);
    });
  }, []);

  const navigateToProcurarVagas = useCallback(
    (id: string) => {
      navigate('CriarVaga', { id });
    },
    [navigate],
  );

  const oi = () => {
    console.log('oi');
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Olá,
          {'\n'}
          <UserName>{user.nome}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
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
          <VagaCard onPress={() => navigateToProcurarVagas(vaga.id)}>
            <VagaAvatar source={{ uri: user.avatar_url }} />
            <VagaInfo>
              <VagaNome>{vaga.nome}</VagaNome>
              <VagaMeta>
                <Icon name="information" size={14} color="#f76769" />
                <VagaMetaText>{vaga.laboratorio.sigla}</VagaMetaText>
              </VagaMeta>
              <VagaMeta>
                <Icon name="currency-usd" size={14} color="#f76769" />
                <VagaMetaText>
                  R$
                  {vaga.vl_bolsa}
                </VagaMetaText>
              </VagaMeta>
              <VagaMeta>
                <Icon name="alarm" size={14} color="#f76769" />
                <VagaMetaText>{vaga.hr_semana}h</VagaMetaText>
              </VagaMeta>
            </VagaInfo>
          </VagaCard>
        )}
      />
      <Button title="Sair" onPress={signOut} />
    </Container>
  );
};

export default DashboardAluno;
