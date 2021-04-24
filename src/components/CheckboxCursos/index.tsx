/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

import api from '../../services/api';
import {
  Container,
  CursoNome,
  CursosBox,
  Icon,
  Title,
  TodosBox,
  VoltarButton,
  VoltarText,
} from './styles';
import { useCursosSelecionados } from '../../hooks/cursos';

interface ICurso {
  nome: string;
  id: string;
  checked: boolean;
}

interface IProps {
  fecharModalCurso(): void;
}

const CursosCheckbox: React.FC<IProps> = ({ fecharModalCurso }) => {
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const { handleSetCursosSelecionados } = useCursosSelecionados();
  const [todosCursos, setTodosCursos] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      await api.get('/cursos').then(response => {
        const dados = response.data.map((curso: ICurso) => {
          curso.checked = false;
          return curso;
        });

        setCursos(dados);
      });
    }
    loadData();
  }, []);

  // useEffect(() => {
  //   console.log(cursos);
  // }, [cursos]);

  // useEffect(() => {
  //   console.log('SEL: ', cursosSelecionados);
  // }, [cursosSelecionados]);

  // useEffect(() => {
  //   console.log('TODOS: ', todosCursos);
  // }, [todosCursos]);

  const handleCursosSelecionados = useCallback(
    (cursoSelecionado: ICurso) => {
      const cursosAtualizados = cursos.map(curso => {
        if (curso.nome === cursoSelecionado.nome)
          curso.checked = !curso.checked;

        return curso;
      });

      setCursos(cursosAtualizados);

      const cursosMarcados = cursos.filter(curso => curso.checked === true);

      const nomes = cursosMarcados.map(curso => curso.nome);

      if (cursosMarcados.length === cursos.length) setTodosCursos(true);
      else setTodosCursos(false);

      handleSetCursosSelecionados(nomes);
    },
    [cursos, handleSetCursosSelecionados],
  );

  const handleTodosCursos = useCallback(
    selecionaTudo => {
      setTodosCursos(selecionaTudo);

      const tudo = cursos.map(curso => {
        curso.checked = selecionaTudo;

        return curso;
      });

      setCursos(tudo);

      if (selecionaTudo) {
        const nomes = tudo.map(curso => curso.nome);

        handleSetCursosSelecionados(nomes);
      } else {
        handleSetCursosSelecionados([]);
      }
    },
    [cursos, handleSetCursosSelecionados],
  );

  return (
    <Container>
      <Title>Cursos</Title>
      <TodosBox>
        <CheckBox
          value={todosCursos}
          onValueChange={e => handleTodosCursos(e)}
          tintColors={{ true: '#f76769', false: '#222680' }}
        />
        <CursoNome>Todos os cursos</CursoNome>
      </TodosBox>

      <FlatList
        keyExtractor={curso => curso.id}
        data={cursos}
        renderItem={({ item: curso }) => {
          return (
            <CursosBox>
              <CheckBox
                value={curso.checked}
                onValueChange={() => handleCursosSelecionados(curso)}
                tintColors={{ true: '#f76769', false: '#222680' }}
              />
              <CursoNome>{curso.nome}</CursoNome>
            </CursosBox>
          );
        }}
      />
      <VoltarButton onPress={fecharModalCurso}>
        <Icon name="arrow-left" size={20} color="#FFF" />
        <VoltarText>Fechar</VoltarText>
      </VoltarButton>
    </Container>
  );
};

export default CursosCheckbox;
