/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect, useRef} from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput, Icon } from './styles';
import {useField} from '@unform/core';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

// eslint-disable-next-line react/prop-types
const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);
  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any,value){
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },
      clearValue(){
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      }
    })
  },[fieldName, registerField]);

return(
  <Container>
    <Icon name={icon} size={16} color="#f76769" />
    <TextInput
      ref={inputElementRef}
      keyboardAppearance="dark"
      placeholderTextColor="#f76769"
      defaultValue={defaultValue}
      onChangeText={(value) => {inputValueRef.current.value = value}}
      {...rest}
    />
</Container>
);
};

export default Input;
