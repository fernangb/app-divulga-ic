import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
  Image,
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
import logoImg from '../../assets/logo1.png';

interface PasswordFormData {
  senhaAntiga: string;
  senha: string;
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
    async (dados: PasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          senhaAntiga: Yup.string().required('Campo obrigatório'),
          senha: Yup.string().required('Campo obrigatório'),
          confirmacaoNovaSenha: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(dados, {
          abortEarly: false,
        });

        const { senhaAntiga, senha, confirmacaoNovaSenha } = dados;

        if (senha !== confirmacaoNovaSenha) {
          Alert.alert(
            'Erro ao atualizar senha',
            'Confirmação de senha inválida.',
          );
        } else {
          const formData = {
            senha: senhaAntiga,
            novaSenha: senha,
          };

          await api
            .put('/senha', formData)
            .then(() => {
              Alert.alert(
                'Senha atualizada com sucesso!',
                'As informações do perfil foram atualizadas.',
              );

              navigation.goBack();
            })
            .catch(err => {
              const { data } = err.response;

              Alert.alert('Erro ao atualizar senha', data.message);
            });
        }
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
            <Image source={logoImg} />

            <View>
              <Title>Alterar Senha</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSaveProfile}>
              <Input
                ref={senhaAntigaInputRef}
                name="senhaAntiga"
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
                name="confirmacaoNovaSenha"
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
