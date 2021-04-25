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
  initialValue?: string;
  containerStyle?: {};
}

const PickerCursos: React.ForwardRefRenderFunction<
  PickerCursosRef,
  PickerCursosProps
> = ({ name, initialValue = '' }, ref) => {
  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const [cursoEscolhido, setCursoEscolhido] = useState<string>(initialValue);
  const [isFilled, setIsFilled] = useState(false);
  const [primeiroLoading, setPrimeiroLoading] = useState(true);
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
  }, [cursoEscolhido]);

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

  const handleValueChange = useCallback(
    (itemValue: string) => {
      if (primeiroLoading && !!initialValue) {
        setPrimeiroLoading(false);
        setIsFilled(true);
      } else if (itemValue === '') {
        setCursoEscolhido('');
        setIsFilled(false);
        pickerValueRef.current.value = itemValue;
      } else {
        pickerValueRef.current.value = itemValue;
        setCursoEscolhido(itemValue);
        setIsFilled(true);
      }

      return itemValue;
    },
    [initialValue, primeiroLoading],
  );

  useEffect(() => {
    pickerValueRef.current.value = cursoEscolhido;
  }, [cursoEscolhido]);

  return (
    <Container isErrored={!!error}>
      <Icon name="school" color={isFilled ? '#f76769' : '#f1faee'} size={16} />
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
