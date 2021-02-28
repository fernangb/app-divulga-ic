import React, { useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface RouteParams {
  id: string;
}

const CriarVaga: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { goBack } = useNavigation();

  const { id } = route.params as RouteParams;

  console.log(id);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="arrow-left" size={24} color="#222680" />
        </BackButton>
        <HeaderTitle>Criar uma Vaga</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
    </Container>
  );
};

export default CriarVaga;
