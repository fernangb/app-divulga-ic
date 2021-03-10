import React, { useCallback, useRef } from 'react';
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

interface ProfileFormData {
  nome: string;
  email: string;
  senhaAntiga: string;
  novaSenha: string;
  confirmacaoNovaSenha: string;
}

const Perfil: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const nomeInputRef = useRef<TextInput>(null);
  const sobrenomeInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const senhaAntigaInputRef = useRef<TextInput>(null);
  const novaSenhaInputRef = useRef<TextInput>(null);
  const confirmacaoSenhaInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const { user, updateUser } = useAuth();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSaveProfile = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        senhaAntiga: Yup.string(),
        senhaAtual: Yup.string().when('senha_antiga', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when('senha_antiga', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('senha_atual'), null], 'Confirmação incorreta'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        nome,
        email,
        senhaAntiga,
        novaSenha,
        confirmacaoNovaSenha,
      } = data;

      const formData = {
        nome,
        email,
        ...(senhaAntiga
          ? {
              senhaAntiga,
              novaSenha,
              confirmacaoNovaSenha,
            }
          : {}),
      };

      const response = await api.put('perfil', formData);

      updateUser(response.data);

      Alert.alert(
        'Perfil atualizado com sucesso!',
        'As informações do perfil foram atualizadas.',
      );

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na atualização do perfil',
        'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
      );
    }
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
                  senhaAntigaInputRef.current?.focus();
                }}
              />
              <Input
                ref={senhaAntigaInputRef}
                name="senha_antiga"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                containerStyle={{ marginTop: 16 }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  novaSenhaInputRef.current?.focus();
                }}
              />
              <Input
                ref={novaSenhaInputRef}
                name="senha"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                containerStyle={{ marginTop: 16 }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmacaoSenhaInputRef.current?.focus();
                }}
              />
              <Input
                ref={confirmacaoSenhaInputRef}
                name="confirmacao_senha"
                icon="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                containerStyle={{ marginTop: 16 }}
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
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

export default Perfil;
