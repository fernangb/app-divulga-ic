import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const VagasList = styled(FlatList as new () => FlatList<IVagas>)`
  padding-top: 8px;
  margin: 16px;
`;

export const VagaAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-left: -8px;
  /* border: 1px;
  border-color: #f76769; */
`;

export const VagaInfo = styled.View`
  flex: 1;
`;

export const VagaNome = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #fff;
  margin-left: 8px;
`;

export const VagaMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  margin-left: 8px;
`;

export const VagaMetaText = styled.Text`
  margin-left: 8px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;

export const VagasListTitle = styled.Text`
  margin-left: 8px;
  margin-bottom: 24px;
  color: #f76769;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
`;
