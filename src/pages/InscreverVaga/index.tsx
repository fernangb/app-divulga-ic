import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  nome: string;
}

const InscreverVaga: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleConfirmarInscricao = useCallback(() => {
    reset({
      routes: [{ name: 'DashboardAluno' }],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Inscrição realizada com sucesso</Title>
      <Description>{routeParams.nome}</Description>
      <OkButton onPress={handleConfirmarInscricao}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default InscreverVaga;
