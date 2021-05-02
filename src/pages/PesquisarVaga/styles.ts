import styled from 'styled-components/native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import IVaga from '../../interfaces/IVaga';

export const Container = styled.View`
  display: flex;
  flex: 1;
`;

export const Title = styled.Text`
  margin-left: 8px;
  margin-bottom: 16px;
  color: #f76769;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  align-self: center;
`;

export const FilterBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const FilterOption = styled(RectButton)`
  background: #222680;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 4px;
  margin-left: 4px;
  padding: 12px 24px;
`;

export const FilterOptionText = styled.Text`
  color: #fff;
  font-size: 12px;
`;

export const VagasList = styled(FlatList as new () => FlatList<IVaga>)`
  padding-top: 8px;
  margin: 16px;
`;

export const VagasListTitle = styled.Text`
  margin-left: 8px;
  margin-bottom: 16px;
  color: #f76769;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
`;
