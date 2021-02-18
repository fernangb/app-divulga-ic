import React, {useRef, useCallback} from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Title, VoltarSigInButton, VoltarSigInText, LogoView } from './styles';
import logoImg from '../../assets/logo1.png';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface CadastroFormData {
  nome: string;
  dre: string;
  curso: string;
  email: string;
  senha: string;
  senhaRepetida: string;
}

const CadastroAluno: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const dreInputRef = useRef<TextInput>(null);
  const courseInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const repeatPasswordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(async (data: CadastroFormData) => {
    formRef.current?.setErrors({});

    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome obrigatório'),
        dre: Yup.string()
        .required('DRE obrigatório')
        .length(9, 'Numero de dígitos inválido'),
        curso: Yup.string().required('Curso obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        senha: Yup.string().min(6, 'Mínimo de 6 caracteres'),
        senhaRepetida: Yup.string()
          .min(6, 'Mínimo de 6 caracteres')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log('Dados: ', data);

      await api.post('/usuarios', {
        email: data.email,
        senha: data.senha,
        id_nivel: "5a5e67d7-3b4b-420b-9b8b-bd5645d3cede"
      });

      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Você já pode fazer login na aplicação.',
      );

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer o cadastro. Tente novamente.',
        );

        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);



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
            <Form ref={formRef} onSubmit={handleSignUp}>
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
                keyboardType='numeric'
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
                name="senha"
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
                name="senhaRepetida"
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
