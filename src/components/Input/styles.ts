import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

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

  ${props => props.isErrored && css`
    border-color: #c53030;
  `}

  ${props => props.isFocused && css`
    border-color: #f76769;
  `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
