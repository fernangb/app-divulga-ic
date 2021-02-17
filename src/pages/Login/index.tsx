import React from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Title, EsqueceuSenha, EsqueceuSenhaText, CadastroText, CadastroButton } from './styles';
import logoImg from '../../assets/logo1.png';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const Login: React.FC = () => {
  const navigation = useNavigation();
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
              <Title>Login</Title>
            </View>
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />
            <Button>Entrar</Button>
            <EsqueceuSenha>
              <EsqueceuSenhaText>Esqueci minha senha</EsqueceuSenhaText>
            </EsqueceuSenha>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CadastroButton onPress={() => navigation.navigate('CadastroAluno')}>
        <Icon name="log-in" size={20} color="#f76769" />
        <CadastroText>Criar uma conta</CadastroText>
      </CadastroButton>

    </>
  );
};

export default Login;
