import styled, { css } from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect, { Item } from 'react-native-picker-select';


interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 90%;
  height: 60px;
  padding: 0 16px;
  background: #222680;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  border-width: 2px;
  border-color: #222680;

  ${props =>
    props.isErrored &&
    css`
      border-color: #cc0000;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #f76769;
    `}
`;

export const TextInput = styled(RNPickerSelect)`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(MaterialIcon)`
  margin-right: 16px;
`;
