/* eslint-disable radix */
import React, { useCallback, useRef } from 'react';
import {
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
import {
  Container,
  Title,
  UserAvatar,
  UserAvatarButton,
  BackButton,
} from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import PickerCursos from '../../components/PickerCursos';

interface ProfileFormData {
  nome: string;
  sobrenome: string;
  email: string;
  curso: string;
  dre: string;
  cr: string;
  periodo: string;
}

const PerfilAluno: React.FC = () => {
  const navigation = useNavigation();
  const { user, aluno, updateUser } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const nomeInputRef = useRef<TextInput>(null);
  const sobrenomeInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const cursoInputRef = useRef<TextInput>(null);
  const dreInputRef = useRef<TextInput>(null);
  const crInputRef = useRef<TextInput>(null);
  const periodoInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSaveProfile = useCallback(
    async (dados: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          sobrenome: Yup.string().required('Nome obrigatório'),
          dre: Yup.string().required('Nome obrigatório'),
          cr: Yup.string().required('Nome obrigatório'),
          periodo: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(dados, {
          abortEarly: false,
        });

        const { nome, sobrenome, email, curso, periodo, cr, dre } = dados;

        const formData = {
          nome,
          sobrenome,
          email,
          curso,
          periodo: parseInt(periodo),
          cr: parseFloat(cr),
          dre,
        };

        await api
          .put('/alunos', formData)
          .then(response => {
            updateUser(response.data);

            Alert.alert(
              'Perfil atualizado com sucesso!',
              'As informações do perfil foram atualizadas.',
            );
          })
          .catch(err => {
            const { data } = err.response;

            Alert.alert('Erro ao atualizar perfil', data.message);
          });

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          Alert.alert(
            'Erro na atualização do perfil',
            'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
          );
        }
      }
    },
    [navigation, updateUser],
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
            <BackButton onPress={handleGoBack}>
              <Icon name="arrow-left" size={24} color="#222680" />
            </BackButton>
            <UserAvatarButton onPress={() => {}}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>
            <View>
              <Title>Meu perfil</Title>
            </View>
            <Form
              initialData={{
                nome: user.nome,
                email: user.email,
                sobrenome: user.sobrenome,
                dre: aluno.dre,
                cr: aluno.cr?.toString(),
                periodo: aluno.cr?.toString(),
              }}
              ref={formRef}
              onSubmit={handleSaveProfile}
            >
              <Input
                ref={nomeInputRef}
                autoCorrect={false}
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
                autoCorrect={false}
                autoCapitalize="words"
                name="sobrenome"
                icon="account"
                placeholder="Sobrenome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="email"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  dreInputRef.current?.focus();
                }}
              />
              <Input
                ref={dreInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                name="dre"
                icon="card-account-details"
                placeholder="DRE"
                returnKeyType="next"
                onSubmitEditing={() => {
                  periodoInputRef.current?.focus();
                }}
              />
              <PickerCursos
                name="curso"
                ref={cursoInputRef}
                initialValue={aluno.curso.nome}
              />
              <Input
                ref={periodoInputRef}
                keyboardType="numeric"
                name="periodo"
                icon="numeric"
                placeholder="Período"
                returnKeyType="next"
                onSubmitEditing={() => {
                  crInputRef.current?.focus();
                }}
              />
              <Input
                ref={crInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                name="cr"
                icon="alpha-c-box"
                placeholder="CR"
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default PerfilAluno;
