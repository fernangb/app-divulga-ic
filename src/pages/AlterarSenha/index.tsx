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
import { Container, Title, BackButton } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface PasswordFormData {
  senhaAntiga: string;
  novaSenha: string;
  confirmacaoNovaSenha: string;
}

const AlterarSenha: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const senhaAntigaInputRef = useRef<TextInput>(null);
  const novaSenhaInputRef = useRef<TextInput>(null);
  const confirmacaoSenhaInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSaveProfile = useCallback(
    async (data: PasswordFormData) => {
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

        const { senhaAntiga, novaSenha, confirmacaoNovaSenha } = data;

        const formData = {
          ...(senhaAntiga
            ? {
                senhaAntiga,
                novaSenha,
                confirmacaoNovaSenha,
              }
            : {}),
        };

        const response = await api.put('perfil', formData);

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
            <BackButton onPress={handleGoBack}>
              <Icon name="arrow-left" size={24} color="#222680" />
            </BackButton>
            <View>
              <Title>Alterar Senha</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSaveProfile}>
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

export default AlterarSenha;
