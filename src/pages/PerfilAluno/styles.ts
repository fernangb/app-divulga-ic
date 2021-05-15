import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 8px ${Platform.OS === 'android' ? 12 : 40}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 36px;
  color: #f76769;
  font-family: 'BubblegumSans-Regular';
  margin: 24px 0 24px;
`;

export const UserAvatar = styled.Image`
  width: 164px;
  height: 164px;
  border-radius: 82px;
  align-self: center;
`;
export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 124px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 24px;
  top: 24px;
`;
