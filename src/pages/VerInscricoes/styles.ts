import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IInscricao } from '../../interfaces/IInscricao';

export const Container = styled.View`
  flex: 1;
`;

export const InscricoesList = styled(
  FlatList as new () => FlatList<IInscricao>,
)`
  padding-top: 8px;
  margin: 16px;
`;

export const InscricaoAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-left: -8px;
  /* border: 1px;
  border-color: #f76769; */
`;

export const InscricaoInfo = styled.View`
  flex: 1;
`;

export const InscricaoNome = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #fff;
  margin-left: 8px;
`;

export const InscricaoMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  margin-left: 8px;
`;

export const IncricaoMetaText = styled.Text`
  margin-left: 8px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;

export const InscricoesListTitle = styled.Text`
  margin-left: 8px;
  margin-bottom: 24px;
  color: #f76769;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
`;
