import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  InscricoesList,
  VagasListTitle,
} from './styles';

import { IInscricao } from '../../interfaces/IInscricao';
import InscricaoCard from '../../components/InscricaoCard';

const MinhasInscricoes: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [inscricoes, setInscricoes] = useState<IInscricao[]>([]);

  const navigateToPerfil = useCallback(() => {
    navigate('Menu');
  }, [navigate]);

  useEffect(() => {
    api.get('/inscricoes_ic/me').then(response => {
      setInscricoes(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Olá,
          {'\n'}
          <UserName>{user.nome}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToPerfil}>
          <UserAvatar
            source={{
              uri: user.avatar_url,
            }}
          />
        </ProfileButton>
      </Header>
      <InscricoesList
        keyExtractor={inscricao => inscricao.id}
        data={inscricoes}
        ListHeaderComponent={<VagasListTitle>Minhas Inscrições</VagasListTitle>}
        renderItem={({ item: inscricao }) => (
          <InscricaoCard inscricao={inscricao} />
        )}
      />
    </Container>
  );
};

export default MinhasInscricoes;
