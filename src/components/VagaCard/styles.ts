import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #222680;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const VagaInfo = styled.View`
  flex: 1;
`;

export const VagaNome = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #f76769;
  margin-left: 8px;
  margin-bottom: 16px;
`;

export const VagaMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  margin-left: 8px;
`;

export const VagaMetaText = styled.Text`
  margin-left: 12px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-size: 12px;
`;
