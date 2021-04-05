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
import Picker, { PickerSelectProps } from 'react-native-picker-select';
import { Container, Icon, PickerCurso } from './styles';
import api from '../../services/api';

interface ICurso {
  nome: string;
  id: string;
}

interface PickerCursosProps extends PickerProps {
  name: string;
  containerStyle?: {};
}

interface PickerCursosValueReference {
  value: string;
}

interface PickerCursosRef {
  focus(): void;
}

interface Props {
  name: string;
  items: ICurso[];
}

const RNPickerSelect: React.FC<Props> = ({ name, items, ...rest }: Props) => {
  // function RNPickerSelect({ name, items, ...rest }: Props) {

  const { fieldName, registerField, defaultValue = '' } = useField(name);
  const [cursoEscolhido, setCursoEscolhido] = useState<string>(defaultValue);
  const [isFilled, setIsFilled] = useState(false);

  // const pickerRef = useRef(null);
  const pickerRef = useRef<PickerCursosValueReference>({ value: defaultValue });

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     ref: pickerRef.current,
  //     getValue: ref => {
  //       return ref.props.value || '';
  //     },
  //     clearValue: ref => {
  //       ref.props.onValueChange(ref.props.placeholder.value);
  //     },
  //     setValue: (_, value: string) => {
  //       setCursoEscolhido(value);
  //     },
  //   });
  // }, [fieldName, registerField]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: pickerRef.current,
      path: 'value',
      setValue(ref: any, value) {
        pickerRef.current.value = value;
        // pickerRef.current.setNativeProps({ text: value });
      },
      clearValue: ref => {
        pickerRef.current.value = '';
        ref.props.onValueChange(ref.props.placeholder.value);
      },
    });
  }, [fieldName, registerField]);

  const handleValueChange = useCallback((itemValue: string) => {
    if (itemValue === '') {
      setCursoEscolhido('');
      setIsFilled(false);
    } else {
      setCursoEscolhido(itemValue);
      setIsFilled(true);
    }
  }, []);

  useEffect(() => {
    console.log('curso: ', cursoEscolhido);
  }, [cursoEscolhido]);

  return (
    <Container isFilled={isFilled}>
      <Icon name="school" size={16} color={isFilled ? '#f76769' : '#f1faee'} />

      <PickerCurso
        selectedValue={cursoEscolhido}
        onValueChange={itemValue => handleValueChange(itemValue)}
        ref={pickerRef}
      >
        <PickerCurso.Item label="Curso" value="" />
        {items.map(curso => {
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
// const PickerCursos: React.FC<Props> = ({ name, items, ...rest }: Props) => {
//   const pickerRef = useRef(null);

//   const { registerField, defaultValue = '', fieldName } = useField(name);
//   const pickerValueRef = useRef<PickerCursosValueReference>({
//     value: defaultValue,
//   });

//   const [cursos, setCursos] = useState<ICurso[]>([]);
//   const [cursoEscolhido, setCursoEscolhido] = useState('');
//   const [isFilled, setIsFilled] = useState(false);

//   useEffect(() => {
//     async function loadData() {
//       await api.get('/cursos').then(response => {
//         setCursos(response.data);
//       });
//     }

//     loadData();
//   }, []);

//   const handleValueChange = useCallback(
//     (itemValue: string) => {
//       if (itemValue === '') {
//         setCursoEscolhido('');
//         setIsFilled(false);
//       } else {
//         setCursoEscolhido(itemValue);
//         setIsFilled(true);
//       }
//     },
//     [isFilled],
//   );

//   useImperativeHandle(ref, () => ({
//     focus() {
//       pickerElementRef.current?.focus();
//     },
//   }));

//   useEffect(() => {
//     registerField<string>({
//       name: fieldName,
//       ref: pickerValueRef.current,
//       path: 'value',
//       setValue(ref: any, value) {
//         pickerValueRef.current.value = value;
//         pickerElementRef.current.setNativeProps({ text: value });
//       },
//       clearValue() {
//         pickerValueRef.current.value = '';
//         pickerElementRef.current.clear();
//       },
//     });
//   }, [fieldName, registerField]);

//   return (
//     <Container isFilled={isFilled}>
//       <Icon name="school" size={16} color={isFilled ? '#f76769' : '#f1faee'} />

//       <PickerCurso
//         selectedValue={cursoEscolhido}
//         onValueChange={itemValue => handleValueChange(itemValue)}
//         ref={pickerElementRef}
//       >
//         <PickerCurso.Item label="Curso" value="" />
//         {cursos.map(curso => {
//           return (
//             <PickerCurso.Item
//               key={curso.id}
//               label={curso.nome}
//               value={curso.nome}
//             />
//           );
//         })}
//       </PickerCurso>
//     </Container>
//   );
// };

export default forwardRef(RNPickerSelect);
// export default RNPickerSelect;
