import React from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Title, VoltarSigInButton, VoltarSigInText, } from './styles';
import logoImg from '../../assets/logo1.png';
import Icon from 'react-native-vector-icons/Feather';

const SignUp: React.FC = () => {
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios'? 'padding': undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Cadastro</Title>
            </View>
            <Input name="user" icon="user" placeholder="Nome completo" />
            <Input name="dre" icon="hash" placeholder="DRE" />
            <Input name="curso" icon="target" placeholder="Senha" />
            <Input name="email" icon="mail" placeholder="Email" />
            <Input name="password" icon="lock" placeholder="Senha" />
            <Input name="password2" icon="lock" placeholder="Repita a sua senha" />
            <Button>Cadastrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <VoltarSigInButton>
        <Icon name="arrow-left" size={20} color="#fff" />
        <VoltarSigInText>Voltar para Login</VoltarSigInText>
      </VoltarSigInButton>

    </>
  );
};

export default SignUp;
