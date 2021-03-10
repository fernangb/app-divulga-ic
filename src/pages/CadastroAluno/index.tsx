import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Autocomplete from 'react-native-autocomplete-input';

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
  dre: string;
  periodo: number;
  curso: string;
  email: string;
  senha: string;
  senhaRepetida: string;
}

interface ICursos {
  nome: string;
  id: string;
}

const CadastroAluno: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const sobrenomeInputRef = useRef<TextInput>(null);
  const dreInputRef = useRef<TextInput>(null);
  const cursoInputRef = useRef<TextInput>(null);
  const periodoInputRef = useRef<TextInput>(null);
  const senhaInputRef = useRef<TextInput>(null);
  const confirmarSenhaInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const [cursos, setCursos] = useState<ICursos[]>([]);
  const [cursosFiltrados, setCursosFiltrados] = useState<ICursos[]>([]);
  const [cursoEscolhido, setCursoEscolhido] = useState<ICursos>();

  useEffect(() => {
    api.get('/cursos').then(response => {
      setCursos(response.data);
    });
  }, []);

  const handleSignUp = useCallback(
    async (data: CadastroFormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          sobrenome: Yup.string().required('Sobrenome obrigatório'),
          dre: Yup.string()
            .required('DRE obrigatório')
            .length(9, 'Numero de dígitos inválido'),
          curso: Yup.string().required('Curso obrigatório'),
          periodo: Yup.string().required('Período obrigatório'),
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

        const nivel = await api.get('/niveis/aluno');

        await api
          .post('/alunos', {
            email: data.email,
            senha: data.senha,
            confirmacao_senha: data.senhaRepetida,
            nome: data.nome,
            sobrenome: data.sobrenome,
            dre: data.dre,
            periodo: data.periodo,
            id_nivel: nivel.data.id,
            id_curso: '2cda4b64-2820-47b2-8dfb-fb518c6b8807',
          })
          .then(response => {
            console.log(response);
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

  useEffect(() => {
    console.log('Cursos: ', cursos);
  }, [cursos]);

  useEffect(() => {
    console.log('Cursos Filtrados: ', cursosFiltrados);
  }, [cursosFiltrados]);

  useEffect(() => {
    console.log('Curso Escolhido: ', cursoEscolhido);
  }, [cursoEscolhido]);

  const findCursos = useCallback(e => {
    const texto = e.currentTarget.value;

    console.log(texto);

    const resultados = cursos.filter(
      c => c.nome.toLowerCase().indexOf(texto.toLowerCase()) > -1,
    );
    console.log(resultados);

    // // Method called every time when we change the value of the input
    // if (texto) {
    //   // Making a case insensitive regular expression
    //   const regex = new RegExp(texto, 'g');
    //   console.log(regex);

    //   cursos.match(regex);

    //   // Setting the filtered film array according the query
    //   setCursosFiltrados(cursos.filter(c => c.nome.search(regex) >= 0));
    // } else {
    //   // If the query is null then return blank
    //   setCursosFiltrados([]);
    // }
  }, []);

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
            {/* <Image source={logoImg} style = {{ width: 150, height: 100 }}/> */}
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Autocomplete
              data={cursos}
              defaultValue=""
              onChangeText={texto => {
                findCursos(texto);
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setCursoEscolhido(item);
                    setCursos([]);
                  }}
                >
                  <Text>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />

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
                  dreInputRef.current?.focus();
                }}
              />
              <Input
                ref={dreInputRef}
                keyboardType="numeric"
                name="dre"
                icon="card-account-details"
                placeholder="DRE"
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
                  periodoInputRef.current?.focus();
                }}
              />
              <Input
                ref={periodoInputRef}
                keyboardType="numeric"
                name="periodo"
                icon="numeric"
                placeholder="Período"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
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

export default CadastroAluno;
