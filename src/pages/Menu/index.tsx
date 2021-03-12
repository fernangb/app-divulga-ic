import React, { useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  BackButton,
  OptionButton,
  OptionText,
  SairButton,
  SairText,
} from './styles';
import { useAuth } from '../../hooks/auth';
import logoImg from '../../assets/logo1.png';

const Menu: React.FC = () => {
  const navigation = useNavigation();

  const { signOut } = useAuth();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="arrow-left" size={24} color="#222680" />
            </BackButton>
            {/* <UserAvatarButton onPress={() => {}}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton> */}
            <Image source={logoImg} />
            <View>
              <Title>Menu</Title>
            </View>
            <OptionButton onPress={() => navigation.navigate('Perfil')}>
              <Icon name="account" size={36} color="#fff" />
              <OptionText>Ver perfil</OptionText>
            </OptionButton>
            <OptionButton onPress={() => navigation.navigate('PesquisarVaga')}>
              <Icon name="magnify" size={36} color="#fff" />
              <OptionText>Buscar mais vagas</OptionText>
            </OptionButton>
            <OptionButton onPress={() => navigation.navigate('MinhasVagas')}>
              <Icon name="clipboard-list" size={36} color="#fff" />
              <OptionText>Minhas vagas</OptionText>
            </OptionButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <SairButton onPress={signOut}>
        <Icon name="arrow-left" size={20} color="#FFF" />
        <SairText>Sair</SairText>
      </SairButton>
    </>
  );
};

export default Menu;
