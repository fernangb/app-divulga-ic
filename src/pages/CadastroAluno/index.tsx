import React, {useRef} from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Title, VoltarSigInButton, VoltarSigInText, LogoView } from './styles';
import logoImg from '../../assets/logo1.png';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';


const CadastroAluno: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const dreInputRef = useRef<TextInput>(null);
  const courseInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const repeatPasswordInputRef = useRef<TextInput>(null);
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
              {/* <Image source={logoImg} style = {{ width: 150, height: 100 }}/> */}
              <View>
              <Title>Crie a sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={() => {}}>
              <Input
                autoCapitalize="words"
                name="nome"
                icon="user"
                placeholder="Nome completo"
                returnKeyType="next"
                onSubmitEditing={() => {
                  dreInputRef.current?.focus()
                }}
              />
              <Input
                ref={dreInputRef}
                name="dre"
                icon="hash"
                placeholder="DRE"
                returnKeyType="next"
                onSubmitEditing={() => {
                  courseInputRef.current?.focus()
                }}
              />
              <Input
                ref={courseInputRef}
                name="curso"
                icon="target"
                placeholder="Curso"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="Email"
                autoCapitalize="none"
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
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  repeatPasswordInputRef.current?.focus()
                }}
              />
              <Input
                ref={repeatPasswordInputRef}
                name="password2"
                icon="lock"
                placeholder="Repita a sua senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />
              <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <VoltarSigInButton  onPress={() => navigation.navigate('Login')}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <VoltarSigInText>Voltar para Login</VoltarSigInText>
      </VoltarSigInButton>

    </>
  );
};

export default CadastroAluno;
