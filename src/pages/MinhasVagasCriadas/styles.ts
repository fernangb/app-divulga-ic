import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import IVaga from '../../interfaces/IVaga';

export const Container = styled.View`
  flex: 1;
`;

export const VagasList = styled(FlatList as new () => FlatList<IVaga>)`
  padding-bottom: 16px;
  margin: 16px;
`;

export const VagasListTitle = styled.Text`
  margin-left: 8px;
  margin-bottom: 24px;
  color: #f76769;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
`;
