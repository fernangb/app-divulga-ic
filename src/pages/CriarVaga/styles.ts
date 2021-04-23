import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 32px 32px ${Platform.OS === 'android' ? 148 : 40}px;
`;

export const Title = styled.Text`
  font-size: 48px;
  color: #f76769;
  font-family: 'BubblegumSans-Regular';
  margin: 64px 0 24px;
`;

export const VoltarButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  border-color: #f76769;
  background: #222680;
  padding: 8px 0 ${8 + getBottomSpace()}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const VoltarText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(MaterialIcon)`
  margin-right: 16px;
`;
