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
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  Container,
  Title,
  VoltarButton,
  VoltarText,
  CheckboxButtonBox,
  Icon,
} from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import DescricaoInput from '../../components/DescricaoInput';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import CheckboxCursos from '../../components/CheckboxCursos';
import CheckboxAreas from '../../components/ChechboxAreas';
import { useCursosSelecionados } from '../../hooks/cursos';
import { useAreasSelecionadas } from '../../hooks/areas';

interface CriarVagaFormData {
  nome: string;
  descricao: string;
  vlBolsa?: number;
  hrSemana?: number;
  crMinimo?: number;
  nrVagas: number;
  periodoMinimo: number;
}

const CriarVaga: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const descricaoInputRef = useRef<TextInput>(null);
  const vlBolsaInputRef = useRef<TextInput>(null);
  const hrSemanaInputRef = useRef<TextInput>(null);
  const crMinimoInputRef = useRef<TextInput>(null);
  const nrVagasInputRef = useRef<TextInput>(null);
  const periodoMinimoInputRef = useRef<TextInput>(null);
  const { cursosSelecionados } = useCursosSelecionados();
  const { areasSelecionadas } = useAreasSelecionadas();
  const { professor, user } = useAuth();
  const { handleSetCursosSelecionados } = useCursosSelecionados();
  const { handleSetAreasSelecionadas } = useAreasSelecionadas();

  const handleCriarVaga = useCallback(
    async (dados: CriarVagaFormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          descricao: Yup.string().required('Descrição obrigatória'),
          vlBolsa: Yup.string().required('Valor da bolsa obrigatório'),
          hrSemana: Yup.string().required('Horas semana obrigatório'),
          crMinimo: Yup.string().required('CR mínimo obrigatório'),
          nrVagas: Yup.string().required('Número de vagas obrigatório'),
          periodoMinimo: Yup.string().required('Núemro de vagas obrigatório'),
        });

        await schema.validate(dados, {
          abortEarly: false,
        });

        await api
          .post('/vagas_ic', {
            nome: dados.nome,
            descricao: dados.descricao,
            vlBolsa: dados.vlBolsa,
            hrSemana: dados.hrSemana,
            crMinimo: dados.crMinimo,
            nrVagas: dados.nrVagas,
            periodoMinimo: dados.periodoMinimo,
            laboratorioId: professor.laboratorio.id,
            usuarioId: user.id,
            cursos: cursosSelecionados,
            areas: areasSelecionadas,
          })
          .then(() => {
            Alert.alert(
              'Vaga criada com sucesso!',
              'Você já pode visualizar as suas vagas criadas',
            );
            handleSetCursosSelecionados([]);
            handleSetAreasSelecionadas([]);
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
    [
      areasSelecionadas,
      cursosSelecionados,
      handleSetAreasSelecionadas,
      handleSetCursosSelecionados,
      navigation,
      professor.laboratorio.id,
      user.id,
    ],
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
          horizontal
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
                  vlBolsaInputRef.current?.focus();
                }}
              />

              <Input
                ref={vlBolsaInputRef}
                keyboardType="numeric"
                name="vlBolsa"
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
                name="hrSemana"
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
                name="crMinimo"
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
                name="periodoMinimo"
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
                name="nrVagas"
                icon="pound"
                placeholder="Número de vagas"
                returnKeyType="next"
                onSubmitEditing={() => {
                  descricaoInputRef.current?.focus();
                }}
              />
              <CheckboxButtonBox>
                <CheckboxCursos />
                <CheckboxAreas />
              </CheckboxButtonBox>

              <DescricaoInput
                ref={descricaoInputRef}
                name="descricao"
                icon="information"
                placeholder="Descrição"
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
