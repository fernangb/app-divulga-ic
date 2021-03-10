import React, { useRef, useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import logoImg from '../../assets/logo1.png';
import {
  Container,
  Title,
  VoltarSigInButton,
  VoltarSigInText,
  LogoView,
} from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface CadastroFormData {
  nome: string;
  sobrenome: string;
  siape: string;
  laboratorio: number;
  curso: string;
  email: string;
  senha: string;
  senhaRepetida: string;
}

const CadastroProfessor: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const sobrenomeInputRef = useRef<TextInput>(null);
  const siapeInputRef = useRef<TextInput>(null);
  const cursoInputRef = useRef<TextInput>(null);
  const laboratorioInputRef = useRef<TextInput>(null);
  const senhaInputRef = useRef<TextInput>(null);
  const confirmarSenhaInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: CadastroFormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          sobrenome: Yup.string().required('Sobrenome obrigatório'),
          siape: Yup.string()
            .required('siape obrigatório')
            .length(7, 'Numero de dígitos inválido'),
          curso: Yup.string().required('Curso obrigatório'),
          laboratorio: Yup.string().required('Laboratório obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          senha: Yup.string().min(6, 'Mínimo de 6 caracteres'),
          senhaRepetida: Yup.string().min(6, 'Mínimo de 6 caracteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log('Dados: ', data);

        const nivel = await api.get('/niveis/professor');

        console.log('Nivel: ', nivel.data.id);

        await api
          .post('/professores', {
            email: data.email,
            senha: data.senha,
            confirmacao_senha: data.senhaRepetida,
            nome: data.nome,
            sobrenome: data.sobrenome,
            siape: data.siape,
            id_nivel: nivel.data.id,
            id_laboratorio: '7d96ee08-fa15-43bb-b834-15db019b36a9',
            id_curso: '2cda4b64-2820-47b2-8dfb-fb518c6b8807',
          })
          .then(response => {
            console.log('Resposta: ', response);
          });

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação.',
        );

        navigation.navigate('Login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          console.log(errors);

          Alert.alert(
            'Erro no cadastro',
            'Ocorreu um erro ao fazer o cadastro. Tente novamente.',
          );
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [navigation],
  );

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
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="nome"
                icon="account"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  sobrenomeInputRef.current?.focus();
                }}
              />
              <Input
                ref={sobrenomeInputRef}
                autoCapitalize="words"
                name="sobrenome"
                icon="account"
                placeholder="Sobrenome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  siapeInputRef.current?.focus();
                }}
              />
              <Input
                ref={siapeInputRef}
                keyboardType="numeric"
                name="siape"
                icon="card-account-details"
                placeholder="SIAPE"
                returnKeyType="next"
                onSubmitEditing={() => {
                  cursoInputRef.current?.focus();
                }}
              />
              <Input
                ref={cursoInputRef}
                name="curso"
                icon="school"
                placeholder="Curso"
                returnKeyType="next"
                onSubmitEditing={() => {
                  laboratorioInputRef.current?.focus();
                }}
              />
              <Input
                ref={laboratorioInputRef}
                name="laboratorio"
                icon="warehouse"
                placeholder="Laboratório"
                returnKeyType="next"
                onSubmitEditing={() => {
                  laboratorioInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                name="email"
                icon="email"
                placeholder="E-mail"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  senhaInputRef.current?.focus();
                }}
              />
              <Input
                ref={senhaInputRef}
                name="senha"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmarSenhaInputRef.current?.focus();
                }}
              />
              <Input
                ref={confirmarSenhaInputRef}
                name="senhaRepetida"
                icon="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
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

export default CadastroProfessor;
