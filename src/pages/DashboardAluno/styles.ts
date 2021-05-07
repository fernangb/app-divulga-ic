import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import IVaga from '../../interfaces/IVaga';

export const Container = styled.View`
  display: flex;
  flex: 1;
`;

export const LoadingView = styled.View`
  align-self: center;
  justify-content: center;
  margin-top: 300px;
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

export const DescriptionBox = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 120px;
`;

export const Description = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 20px;
  color: #262880;
  margin-top: 64px;
  text-align: center;
`;

export const RedirectButton = styled(RectButton)`
  width: 90%;
  background: #f76769;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 64px;
  padding: 12px 24px;
`;

export const RedirectButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #222680;
  font-size: 18px;
`;
