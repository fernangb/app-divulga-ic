import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  /* height: 132px;
  background: #222680;
  border-radius: 10px;
  margin-top: 4px;
  border-width: 2px;
  border-color: #222680; */
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(MaterialIcon)`
  margin-right: 16px;
`;

export const CursosBox = styled.View`
  flex-direction: row;
  margin-top: 4px;
  align-items: center;
`;

export const TodosBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-right: 160px;
`;

export const CursoNome = styled.Text`
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
