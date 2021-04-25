import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AreasBox = styled.View`
  flex-direction: row;
  margin-top: 4px;
  align-items: center;
`;

export const TodasBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-right: 160px;
`;

export const AreaNome = styled.Text`
  color: #222680;
  font-size: 16px;
`;

export const Title = styled.Text``;

export const CloseModalButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
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

export const ButtonBox = styled.View`
  width: 90%;
  height: 48px;
  padding: 0 16px;
  background: #222680;
  border-radius: 10px;
  margin-bottom: 4px;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
  border-width: 2px;
  border-color: #222680;
  align-self: flex-end;
`;

export const CheckboxButton = styled.TouchableOpacity`
  background: #222680;
  height: 48px;
  border-radius: 10px;
  margin-bottom: 4px;
  margin-top: 4px;
  flex-direction: row;
  border-width: 2px;
  border-color: #222680;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(MaterialIcon)`
  margin-right: 20px;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;
