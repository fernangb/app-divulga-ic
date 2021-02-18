/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect, useState, useCallback, useRef, useImperativeHandle, forwardRef} from 'react';
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

interface InputRef {
  focus(): void;
}

// eslint-disable-next-line react/prop-types
const Input: React.ForwardRefRenderFunction<InputRef,InputProps> = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null);

  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus(){
      inputElementRef.current?.focus();
    }
  }));

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
  <Container isFocused={isFocused} isErrored={!!error}>
    <Icon name={icon} size={16} color={isFocused || isFilled? "#f76769" : '#fff'} />
    <TextInput
      ref={inputElementRef}
      keyboardAppearance="dark"
      placeholderTextColor= '#fff'
      defaultValue={defaultValue}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      onChangeText={(value) => {inputValueRef.current.value = value}}
      {...rest}
    />
</Container>
);
};

export default forwardRef(Input);
