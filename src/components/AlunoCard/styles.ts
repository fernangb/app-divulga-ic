import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: #222680;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 24px;
  flex-direction: column;
  align-items: flex-start;
`;

export const VagaTitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  /* align-items: center; */
  justify-content: space-between;
`;

export const MaisInfoButton = styled.TouchableOpacity``;

export const VagaInfo = styled.View``;

export const AlunoNome = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
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
  font-size: 14px;
`;

export const AlunoButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const AlunoText = styled.Text`
  color: #f76769;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  align-self: center;
`;

export const VagaAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-left: -8px;
  /* border: 1px;
  border-color: #f76769; */
`;
