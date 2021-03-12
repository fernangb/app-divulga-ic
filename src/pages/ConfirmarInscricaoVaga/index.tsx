import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Title,
  Description,
  RedirectButton,
  RedirectButtonText,
} from './styles';

interface RouteParams {
  nome: string;
}

const ConfirmarInscricaoVaga: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleVagasRecomendadas = useCallback(() => {
    reset({
      routes: [{ name: 'DashboardAluno' }],
      index: 0,
    });
  }, [reset]);

  const handleMinhasInscricoes = useCallback(() => {
    reset({
      routes: [{ name: 'MinhasInscricoes' }],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Inscrição realizada com sucesso</Title>
      <Description>{routeParams.nome}</Description>
      <RedirectButton onPress={handleMinhasInscricoes}>
        <RedirectButtonText>Ver minhas inscrições</RedirectButtonText>
      </RedirectButton>
      <RedirectButton onPress={handleVagasRecomendadas}>
        <RedirectButtonText>Voltar para vagas recomendadas</RedirectButtonText>
      </RedirectButton>
    </Container>
  );
};

export default ConfirmarInscricaoVaga;
