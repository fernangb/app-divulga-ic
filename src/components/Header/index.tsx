import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
} from './styles';

const Header: React.FC = () => {
  const { user } = useAuth();

  const { navigate } = useNavigation();

  const navigateToMenu = useCallback(() => {
    navigate('MenuAluno');
  }, [navigate]);

  if (!user.avatar_url) {
    return (
      <Container>
        <HeaderTitle>
          Olá,
          {'\n'}
          <UserName>{user.nome}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToMenu}>
          <Icon name="account-circle" size={64} color="#f76769" />
        </ProfileButton>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderTitle>
        Olá,
        {'\n'}
        <UserName>{user.nome}</UserName>
      </HeaderTitle>
      <ProfileButton onPress={navigateToMenu}>
        <UserAvatar
          source={{
            uri: user.avatar_url,
          }}
        />
      </ProfileButton>
    </Container>
  );
};

export default Header;
