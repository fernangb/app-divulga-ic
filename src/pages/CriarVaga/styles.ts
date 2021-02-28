/* eslint-disable import/prefer-default-export */
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 8px;
  padding-top: ${getStatusBarHeight() + 8}px;
  background: #222680;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`;
export const UserAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-left: auto;
`;
