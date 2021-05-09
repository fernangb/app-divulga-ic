import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 160 : 280}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 36px;
  color: #f76769;
  font-family: 'BubblegumSans-Regular';
  margin: 24px 0 24px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 24px;
  top: 24px;
`;

export const OptionButton = styled.TouchableOpacity`
  background: #222680;
  padding: 16px 8px ${16 + getBottomSpace()}px;
  margin: 4px;
  align-items: center;
  flex-direction: row;
  width: 90%;
  height: 64px;
  border-radius: 8px;
`;

export const OptionText = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-left: 24px;
  font-family: 'RobotoSlab-Regular';
`;

export const SairButton = styled.TouchableOpacity`
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

export const SairText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;

export const ImageView = styled.View`
  margin-top: 72px;
`;
