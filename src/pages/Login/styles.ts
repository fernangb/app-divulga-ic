import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const Title = styled.Text`
  font-size: 48px;
  color: #f76769;
  font-family: 'BubblegumSans-Regular';
  margin: 64px 0 24px;
`;

export const EsqueceuSenha = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const EsqueceuSenhaText = styled.Text`
  color: #222680;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;

export const CadastroButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  border-color: #f76769;
  background: #222680;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const CadastroText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;
