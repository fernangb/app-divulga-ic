import React, {useCallback, useRef} from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Title, EsqueceuSenha, EsqueceuSenhaText, CadastroText, CadastroButton } from './styles';
import logoImg from '../../assets/logo1.png';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleLogin = useCallback((data: object) => {
    console.log(data);
  }, []);

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
            <Form ref={formRef} onSubmit={handleLogin}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
               />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />
              <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
            </Form>
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
