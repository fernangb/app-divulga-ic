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
  VagasList,
  VagasListTitle,
} from './styles';

import VagaCard from '../../components/VagaCard';
import { IVaga } from '../../interfaces/IVaga';

const MinhasVagas: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [vagas, setVagas] = useState<IVaga[]>([]);

  const navigateToPerfil = useCallback(() => {
    navigate('Menu');
  }, [navigate]);

  useEffect(() => {
    api.get('/inscricoes_ic/me').then(response => {
      console.log('Inscricoes: ', response.data);

      setVagas(response.data.vaga_ic);
    });
  }, []);

  useEffect(() => {
    console.log('Vagas Inscritas: ', vagas);
  }, [vagas]);

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
        ListHeaderComponent={<VagasListTitle>Minhas Vagas</VagasListTitle>}
        renderItem={({ item: vaga }) => (
          <VagaCard
            vaga={vaga}
            // onPress={() => navigateToProcurarVagas(vaga.id)}
          />
        )}
      />
    </Container>
  );
};

export default MinhasVagas;
