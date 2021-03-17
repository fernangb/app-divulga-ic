import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IInscricao } from '../../interfaces/IInscricao';

export const Container = styled.View`
  flex: 1;
`;

export const InscricoesList = styled(
  FlatList as new () => FlatList<IInscricao>,
)`
  padding-bottom: 16px;
  margin: 16px;
`;

export const InscricoesListTitle = styled.Text`
  margin-left: 8px;
  margin-bottom: 24px;
  color: #f76769;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
`;
