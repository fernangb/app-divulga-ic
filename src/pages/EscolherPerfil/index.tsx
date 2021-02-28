import React, { useCallback } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  VoltarSigInButton,
  VoltarSigInText,
  NivelButton,
  NivelButtonText,
} from './styles';

const EscolherPerfil: React.FC = () => {
  const navigation = useNavigation();

  const navigateToCadastroAluno = useCallback(() => {
    navigation.navigate('CadastroAluno');
  }, [navigation]);

  const navigateToCadastroProfessor = useCallback(() => {
    navigation.navigate('CadastroProfessor');
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
            <Title>Escolha um Perfil:</Title>
            <NivelButton onPress={navigateToCadastroAluno}>
              <Icon name="account" size={128} color="#f76769" />
              <NivelButtonText>Aluno</NivelButtonText>
            </NivelButton>
            <NivelButton onPress={navigateToCadastroProfessor}>
              <Icon name="school" size={128} color="#f76769" />
              <NivelButtonText>Professor</NivelButtonText>
            </NivelButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <VoltarSigInButton onPress={() => navigation.navigate('Login')}>
        <Icon name="arrow-left" size={20} color="#FFF" />
        <VoltarSigInText>Voltar para Login</VoltarSigInText>
      </VoltarSigInButton>
    </>
  );
};

export default EscolherPerfil;
