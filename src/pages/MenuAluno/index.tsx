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
  ImageView,
} from './styles';
import { useAuth } from '../../hooks/auth';
import logoImg from '../../assets/logo1.png';
import Header from '../../components/Header';

const MenuAluno: React.FC = () => {
  const navigation = useNavigation();

  const { signOut } = useAuth();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <Header />

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
            <ImageView>
              <Image source={logoImg} />
            </ImageView>
            <View>
              <Title>Menu</Title>
            </View>
            <OptionButton onPress={() => navigation.navigate('DashboardAluno')}>
              <Icon name="home" size={36} color="#fff" />
              <OptionText>Vagas recomendadas</OptionText>
            </OptionButton>
            <OptionButton onPress={() => navigation.navigate('PerfilAluno')}>
              <Icon name="account" size={36} color="#fff" />
              <OptionText>Ver perfil</OptionText>
            </OptionButton>
            <OptionButton onPress={() => navigation.navigate('AlterarSenha')}>
              <Icon name="lock" size={36} color="#fff" />
              <OptionText>Alterar Senha</OptionText>
            </OptionButton>
            <OptionButton onPress={() => navigation.navigate('PesquisarVaga')}>
              <Icon name="magnify" size={36} color="#fff" />
              <OptionText>Buscar mais vagas</OptionText>
            </OptionButton>
            <OptionButton
              onPress={() => navigation.navigate('MinhasInscricoes')}
            >
              <Icon name="clipboard-list" size={36} color="#fff" />
              <OptionText>Minhas inscrições</OptionText>
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

export default MenuAluno;
