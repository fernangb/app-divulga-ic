/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

// eslint-disable-next-line react/prop-types
const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
  <Container>
    <Icon name={icon} size={16} color="#f76769" />
    <TextInput
      keyboardAppearance="dark"
      placeholderTextColor="#f76769"
      {...rest}
    />
  </Container>
);

export default Input;
