import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 125 : 40}px;
`;

export const LogoView = styled.View`
  flex: 1;
  width: 10%;
`;

export const Title = styled.Text`
  font-size: 48px;
  color: #f76769;
  font-family: 'BubblegumSans-Regular';
  margin: 64px 0 64px;
`;

export const VoltarSigInButton = styled.TouchableOpacity`
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

export const VoltarSigInText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;

export const NivelButton = styled(RectButton)`
  background: #222680;
  width: 256px;
  height: 256px;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NivelButtonText = styled.Text`
  color: #fff;
  font-size: 48px;

  font-family: 'RobotoSlab-Regular';
`;
