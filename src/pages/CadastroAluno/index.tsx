/* eslint-disable array-callback-return */
/* eslint-disable no-unused-labels */
import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Autocomplete from 'react-native-autocomplete-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
// import { Picker } from '@react-native-picker/picker';
import { Picker } from '@react-native-community/picker';
import {
  Container,
  VoltarSigInButton,
  VoltarSigInText,
  ListCursos,
  CursoContainer,
  Title,
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
  const [cursoEscolhido, setCursoEscolhido] = useState('');

  useEffect(() => {
    api.get('/cursos').then(response => {
      setCursos(response.data);
    });
  }, []);

  useEffect(() => {
    console.log('Cursos: ', cursos);
  }, [cursos]);

  const handleSignUp = useCallback(
    async (dados: CadastroFormData) => {
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

        await schema.validate(dados, {
          abortEarly: false,
        });

        const nivel = await api.get('/niveis/aluno');

        await api
          .post('/alunos', {
            email: dados.email,
            senha: dados.senha,
            confirmacao_senha: dados.senhaRepetida,
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            dre: dados.dre,
            periodo: dados.periodo,
            id_nivel: nivel.data.id,
            id_curso: '2cda4b64-2820-47b2-8dfb-fb518c6b8807',
          })
          .then(response => {
            Alert.alert(
              'Cadastro realizado com sucesso!',
              'Você já pode fazer login na aplicação.',
            );

            navigation.navigate('Login');
          })
          .catch(err => {
            console.log(err);

            const { data } = err.response;

            Alert.alert('Erro ao realizar o cadastro', data.message);
          });
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
    },
    [navigation],
  );

  useEffect(() => {
    console.log('Curso Escolhido: ', cursoEscolhido);
  }, [cursoEscolhido]);

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
              <CursoContainer>
                <ListCursos
                  selectedValue={cursoEscolhido}
                  onValueChange={itemValue => setCursoEscolhido(itemValue)}
                >
                  {cursos.map(curso => {
                    return (
                      <Picker.Item
                        key={curso.id}
                        label={curso.nome}
                        value={curso.nome}
                      />
                    );
                  })}
                </ListCursos>
              </CursoContainer>

              {/* <Input
                ref={cursoInputRef}
                name="curso"
                icon="school"
                placeholder="Curso"
                returnKeyType="next"
                onSubmitEditing={() => {
                  periodoInputRef.current?.focus();
                }}
              /> */}
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
