/* eslint-disable eqeqeq */
import React, { useRef, useCallback } from 'react';
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

import { Container, Title, VoltarButton, VoltarText } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface CriarVagaFormData {
  nome: string;
  descricao: string;
  vl_bolsa?: number;
  hr_semana?: number;
  cr_minimo?: number;
  nr_vagas: number;
  periodo_minimo: number;
  // area: string;
}

const CriarVaga: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const descricaoInputRef = useRef<TextInput>(null);
  const vlBolsaInputRef = useRef<TextInput>(null);
  const hrSemanaInputRef = useRef<TextInput>(null);
  const crMinimoInputRef = useRef<TextInput>(null);
  const nrVagasInputRef = useRef<TextInput>(null);
  const periodoMinimoInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { professor } = useAuth();

  const handleCriarVaga = useCallback(
    async (dados: CriarVagaFormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          descricao: Yup.string().required('Descrição obrigatória'),
          vl_bolsa: Yup.string().required('Valor da bolsa obrigatório'),
          hr_semana: Yup.string().required('Horas semana obrigatório'),
          cr_minimo: Yup.string().required('CR mínimo obrigatório'),
          nr_vagas: Yup.string().required('Número de vagas obrigatório'),
          periodo_minimo: Yup.string().required('Núemro de vagas obrigatório'),
        });

        await schema.validate(dados, {
          abortEarly: false,
        });

        await api
          .post('/vagas_ic', {
            nome: dados.nome,
            descricao: dados.descricao,
            vl_bolsa: dados.vl_bolsa,
            hr_semana: dados.hr_semana,
            cr_minimo: dados.cr_minimo,
            nr_vagas: dados.nr_vagas,
            periodo_minimo: dados.periodo_minimo,
            id_laboratorio: professor.laboratorio.id,
            id_curso: professor.curso.id,
            id_professor: professor.id,
            id_area: '0198a630-1fb3-4fe5-bdcc-2708993382b0',
          })
          .then(() => {
            Alert.alert(
              'Vaga criada com sucesso!',
              'Você já pode visualizar as suas vagas criadas',
            );
            navigation.navigate('DashboardProfessor');
          })
          .catch(err => {
            const { data } = err.response;

            Alert.alert('Erro na criação da vaga', data.message);
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          Alert.alert(
            'Erro na criação da vaga',
            'Ocorreu um erro ao fazer o cadastro. Tente novamente.',
          );
        }
      }
    },
    [navigation, professor.curso.id, professor.id, professor.laboratorio.id],
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
              <Title>Criar vaga de IC</Title>
            </View>
            <Form ref={formRef} onSubmit={handleCriarVaga}>
              <Input
                autoCapitalize="words"
                name="nome"
                icon="card-account-details"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  descricaoInputRef.current?.focus();
                }}
              />
              <Input
                ref={descricaoInputRef}
                autoCapitalize="words"
                name="descricao"
                icon="information"
                placeholder="Descrição"
                returnKeyType="next"
                onSubmitEditing={() => {
                  vlBolsaInputRef.current?.focus();
                }}
              />
              <Input
                ref={vlBolsaInputRef}
                keyboardType="numeric"
                name="vl_bolsa"
                icon="currency-usd"
                placeholder="Valor da bolsa"
                returnKeyType="next"
                onSubmitEditing={() => {
                  hrSemanaInputRef.current?.focus();
                }}
              />
              <Input
                ref={hrSemanaInputRef}
                keyboardType="numeric"
                name="hr_semana"
                icon="alarm"
                placeholder="Horas semanais"
                returnKeyType="next"
                onSubmitEditing={() => {
                  crMinimoInputRef.current?.focus();
                }}
              />
              <Input
                ref={crMinimoInputRef}
                keyboardType="numeric"
                name="cr_minimo"
                icon="alpha-c-box"
                placeholder="CR mínimo"
                returnKeyType="next"
                onSubmitEditing={() => {
                  periodoMinimoInputRef.current?.focus();
                }}
              />
              <Input
                ref={periodoMinimoInputRef}
                keyboardType="numeric"
                name="periodo_minimo"
                icon="progress-check"
                placeholder="Período mínimo"
                returnKeyType="next"
                onSubmitEditing={() => {
                  nrVagasInputRef.current?.focus();
                }}
              />
              <Input
                ref={nrVagasInputRef}
                keyboardType="numeric"
                name="nr_vagas"
                icon="pound"
                placeholder="Número de vagas"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Criar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <VoltarButton onPress={() => navigation.navigate('DashboardProfessor')}>
        <Icon name="arrow-left" size={20} color="#FFF" />
        <VoltarText>Voltar para Dashboard</VoltarText>
      </VoltarButton>
    </>
  );
};

export default CriarVaga;
