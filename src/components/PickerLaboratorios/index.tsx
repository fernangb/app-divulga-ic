/* eslint-disable no-shadow */
import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import { PickerProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, Icon, PickerLaboratorio } from './styles';
import api from '../../services/api';

interface ILaboratorio {
  sigla: string;
  id: string;
}

interface PickerLaboratoriosValueReference {
  value: string;
}

interface PickerLaboratoriosRef {
  focus(): void;
}

interface PickerLaboratoriosProps extends PickerProps {
  name: string;
  containerStyle?: {};
}

const PickerLaboratorios: React.ForwardRefRenderFunction<
  PickerLaboratoriosRef,
  PickerLaboratoriosProps
> = ({ name }, ref) => {
  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const [laboratorioEscolhido, setLaboratorioEscolhido] = useState<string>(
    defaultValue,
  );
  const [isFilled, setIsFilled] = useState(false);
  const [laboratorios, setLaboratorios] = useState<ILaboratorio[]>([]);

  const pickerElementRef = useRef<any>(null);
  const pickerValueRef = useRef<PickerLaboratoriosValueReference>({
    value: defaultValue,
  });

  useImperativeHandle(ref, () => ({
    focus() {
      pickerElementRef.current?.focus();
    },
  }));

  useEffect(() => {
    api.get('/laboratorios').then(response => {
      setLaboratorios(response.data);
    });
  }, []);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: pickerValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        pickerValueRef.current.value = value;
        pickerElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        pickerValueRef.current.value = '';
        pickerElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  const handleValueChange = useCallback((itemValue: string) => {
    if (itemValue === '') {
      setLaboratorioEscolhido('');
      setIsFilled(false);
      pickerValueRef.current.value = itemValue;
    } else {
      pickerValueRef.current.value = itemValue;
      setLaboratorioEscolhido(itemValue);
      setIsFilled(true);
    }

    return itemValue;
  }, []);

  useEffect(() => {
    pickerValueRef.current.value = laboratorioEscolhido;

    console.log('lab1: ', laboratorioEscolhido);
    console.log('lab2: ', pickerValueRef.current.value);
  }, [laboratorioEscolhido]);

  return (
    <Container isErrored={!!error}>
      <Icon
        name="filter"
        color={isFilled ? '#f76769' : '#f1faee'}
        size={16}
        style={{ transform: [{ rotateZ: '180deg' }] }}
      />
      <PickerLaboratorio
        selectedValue={laboratorioEscolhido}
        onValueChange={itemValue => handleValueChange(itemValue)}
        ref={pickerElementRef}
      >
        <PickerLaboratorio.Item label="Laboratório" value="" />
        {laboratorios.map(laboratorio => {
          return (
            <PickerLaboratorio.Item
              key={laboratorio.id}
              label={laboratorio.sigla}
              value={laboratorio.sigla}
            />
          );
        })}
      </PickerLaboratorio>
    </Container>
  );
};

export default forwardRef(PickerLaboratorios);
