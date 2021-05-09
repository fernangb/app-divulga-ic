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
    if (user.nivel.nome === 'professor') navigate('MenuProfessor');
    else navigate('MenuAluno');
  }, [navigate, user.nivel.nome]);

  if (!user.avatar_url) {
    return (
      <Container>
        <HeaderTitle>
          Olá,
          {'\n'}
          <UserName>{user.nome}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToMenu}>
          <Icon name="menu" color="#f76769" size={48} />
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
