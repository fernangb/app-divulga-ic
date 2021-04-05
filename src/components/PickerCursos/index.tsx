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
import { Container, Icon, PickerCurso } from './styles';
import api from '../../services/api';

interface ICurso {
  nome: string;
  id: string;
}

interface PickerCursosValueReference {
  value: string;
}

interface PickerCursosRef {
  focus(): void;
}

interface PickerCursosProps extends PickerProps {
  name: string;
  containerStyle?: {};
}

const PickerCursos: React.ForwardRefRenderFunction<
  PickerCursosRef,
  PickerCursosProps
> = ({ name }, ref) => {
  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const [cursoEscolhido, setCursoEscolhido] = useState<string>(defaultValue);
  const [isFilled, setIsFilled] = useState(false);
  const [cursos, setCursos] = useState<ICurso[]>([]);

  const pickerElementRef = useRef<any>(null);
  const pickerValueRef = useRef<PickerCursosValueReference>({
    value: defaultValue,
  });

  useImperativeHandle(ref, () => ({
    focus() {
      pickerElementRef.current?.focus();
    },
  }));

  useEffect(() => {
    api.get('/cursos').then(response => {
      setCursos(response.data);
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
      setCursoEscolhido('');
      setIsFilled(false);
      pickerValueRef.current.value = itemValue;
    } else {
      pickerValueRef.current.value = itemValue;
      setCursoEscolhido(itemValue);
      setIsFilled(true);
    }

    return itemValue;
  }, []);

  useEffect(() => {
    pickerValueRef.current.value = cursoEscolhido;

    console.log('c1: ', cursoEscolhido);
    console.log('c2: ', pickerValueRef.current.value);
  }, [cursoEscolhido]);

  return (
    <Container isErrored={!!error}>
      <Icon name="school" size={16} color={isFilled ? '#f76769' : '#f1faee'} />

      <PickerCurso
        selectedValue={cursoEscolhido}
        onValueChange={itemValue => handleValueChange(itemValue)}
        ref={pickerElementRef}
      >
        <PickerCurso.Item label="Curso" value="" />
        {cursos.map(curso => {
          return (
            <PickerCurso.Item
              key={curso.id}
              label={curso.nome}
              value={curso.nome}
            />
          );
        })}
      </PickerCurso>
    </Container>
  );
};

export default forwardRef(PickerCursos);
