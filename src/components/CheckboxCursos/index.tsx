/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

import { Modal } from 'react-native';
import api from '../../services/api';
import {
  CheckboxButton,
  ButtonText,
  Container,
  CursoNome,
  CursosBox,
  Icon,
  TodosBox,
  VoltarButton,
  VoltarText,
  ButtonBox,
} from './styles';
import { useCursos } from '../../hooks/cursos';

interface ICurso {
  nome: string;
  id: string;
  checked: boolean;
}

const CursosCheckbox: React.FC = () => {
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const { cursosSelecionados, handleSetCursosSelecionados } = useCursos();
  const [todosCursos, setTodosCursos] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (cursos.length === 0) handleSetCursosSelecionados([]);
  }, [cursos.length, handleSetCursosSelecionados]);

  useEffect(() => {
    async function loadData() {
      await api.get('/cursos').then(response => {
        const dados = response.data.map((curso: ICurso) => {
          if (cursosSelecionados.find(nome => curso.nome === nome))
            curso.checked = true;
          else curso.checked = false;

          return curso;
        });

        setCursos(dados);
      });
    }
    loadData();
  }, [cursosSelecionados]);

  useEffect(() => {
    if (cursosSelecionados.length > 0) setIsFilled(true);
    else setIsFilled(false);

    if (cursosSelecionados.length === cursos.length) setTodosCursos(true);
  }, [cursos.length, cursosSelecionados.length]);

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
      <ButtonBox>
        <CheckboxButton onPress={() => setModalAberto(true)}>
          <Icon
            name="school"
            size={16}
            color={isFilled ? '#f76769' : '#f1faee'}
          />
          <ButtonText>Cursos</ButtonText>
        </CheckboxButton>
      </ButtonBox>

      <Modal visible={modalAberto}>
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
        <VoltarButton onPress={() => setModalAberto(false)}>
          <Icon name="arrow-left" size={20} color="#FFF" />
          <VoltarText>Fechar</VoltarText>
        </VoltarButton>
      </Modal>
    </Container>
  );
};

export default CursosCheckbox;
