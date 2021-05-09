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
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import PickerCursos from '../../components/PickerCursos';
import PickerLaboratorios from '../../components/PickerLaboratorios';
import logoImg from '../../assets/logo1.png';

interface ProfileFormData {
  nome: string;
  sobrenome: string;
  email: string;
  siape: string;
  curso: string;
  laboratorio: string;
}

const PerfilProfessor: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const nomeInputRef = useRef<TextInput>(null);
  const sobrenomeInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const siapeInputRef = useRef<TextInput>(null);
  const cursoInputRef = useRef<TextInput>(null);
  const laboratorioInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const { user, professor, updateProfessor } = useAuth();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSaveProfile = useCallback(
    async (dados: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          sobrenome: Yup.string().required('Sobrenome obrigatório'),
          siape: Yup.string().required('SIAPE obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(dados, {
          abortEarly: false,
        });

        await api
          .put('/professores', dados)
          .then(response => {
            updateProfessor(response.data);

            Alert.alert(
              'Perfil atualizado com sucesso!',
              'As informações do perfil foram atualizadas.',
            );
            navigation.goBack();
          })
          .catch(err => {
            const { data } = err.response;

            Alert.alert('Erro ao atualizar perfil', data.message);
          });
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
    [navigation, updateProfessor],
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
            {/* <UserAvatarButton onPress={() => {}}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton> */}
            <Image source={logoImg} />

            <View>
              <Title>Meu perfil</Title>
            </View>
            <Form
              initialData={{
                nome: user.nome,
                email: user.email,
                sobrenome: user.sobrenome,
                siape: professor.siape,
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

              <PickerCursos
                name="curso"
                ref={cursoInputRef}
                initialValue={professor.curso.nome}
              />
              <PickerLaboratorios
                name="laboratorio"
                ref={laboratorioInputRef}
                initialValue={professor.laboratorio.sigla}
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

export default PerfilProfessor;
