import styled from 'styled-components/native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import IVaga from '../../interfaces/IVaga';

export const Container = styled.View`
  display: flex;
  flex: 1;
`;

export const LoadingView = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin-left: 8px;
  margin-top: 16px;
  margin-bottom: 32px;
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

export const FilterOption = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  margin-left: 4px;
  padding: 12px 24px;
`;

export const SearchButton = styled(RectButton)`
  background: #f76769;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 24px 16px 0px;
  padding: 12px 24px;
`;

export const SearchButtonText = styled.Text`
  color: #222680;
  font-size: 16px;
  margin-left: 8px;
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
