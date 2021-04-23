import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  height: 132px;
  background: #222680;
  border-radius: 10px;
  /* align-items: center; */
  margin-top: 4px;
  border-width: 2px;
  border-color: #222680;
`;

export const Icon = styled(MaterialIcon)`
  margin-right: 16px;
`;

export const CursosBox = styled.View`
  flex-direction: row;
`;

export const TodosBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-right: 160px;
`;

export const CursoNome = styled.Text`
  color: #fff;
`;

export const Title = styled.Text``;

export const CloseModalButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;
