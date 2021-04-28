import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 8px;
  background: #222680;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom-width: 1px;
  border-color: #f76769;
`;
export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 20px;
  padding: 8px;
`;

export const UserName = styled.Text`
  color: #f76769;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;
