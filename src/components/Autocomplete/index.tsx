/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './styles';

interface AutocompleteProps {
  items: Object[];
}

const Autocomplete = React.FC = () => {


  return (
    <Container>


      <TextInput />
    </Container>
  );
});

export default Autocomplete;
