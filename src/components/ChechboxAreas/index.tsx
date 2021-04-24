/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

import api from '../../services/api';
import {
  Container,
  AreaNome,
  AreasBox,
  Icon,
  Title,
  TodosBox,
  VoltarButton,
  VoltarText,
} from './styles';
import { useAreasSelecionadas } from '../../hooks/areas';

interface IArea {
  nome: string;
  id: string;
  checked: boolean;
}

interface IProps {
  fecharModalArea(): void;
}

const AreasCheckbox: React.FC<IProps> = ({ fecharModalArea }) => {
  const [areas, setAreas] = useState<IArea[]>([]);
  const { handleSetAreasSelecionadas } = useAreasSelecionadas();
  const [todosAreas, setTodosAreas] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      await api.get('/areas').then(response => {
        const dados = response.data.map((area: IArea) => {
          area.checked = false;
          return area;
        });

        setAreas(dados);
      });
    }
    loadData();
  }, []);

  // useEffect(() => {
  //   console.log(areas);
  // }, [areas]);

  // useEffect(() => {
  //   console.log('SEL: ', areasSelecionadas);
  // }, [areasSelecionadas]);

  // useEffect(() => {
  //   console.log('TODOS: ', todosAreas);
  // }, [todosAreas]);

  const handleAreasSelecionadas = useCallback(
    (areaSelecionado: IArea) => {
      const areasAtualizados = areas.map(area => {
        if (area.nome === areaSelecionado.nome) area.checked = !area.checked;

        return area;
      });

      setAreas(areasAtualizados);

      const areasMarcados = areas.filter(area => area.checked === true);

      const nomes = areasMarcados.map(area => area.nome);

      if (areasMarcados.length === areas.length) setTodosAreas(true);
      else setTodosAreas(false);

      handleSetAreasSelecionadas(nomes);
    },
    [areas, handleSetAreasSelecionadas],
  );

  const handleTodosAreas = useCallback(
    selecionaTudo => {
      setTodosAreas(selecionaTudo);

      const tudo = areas.map(area => {
        area.checked = selecionaTudo;

        return area;
      });

      setAreas(tudo);

      if (selecionaTudo) {
        const nomes = tudo.map(area => area.nome);

        handleSetAreasSelecionadas(nomes);
      } else {
        handleSetAreasSelecionadas([]);
      }
    },
    [areas, handleSetAreasSelecionadas],
  );

  return (
    <Container>
      <Title>Áreas</Title>
      <TodosBox>
        <CheckBox
          value={todosAreas}
          onValueChange={e => handleTodosAreas(e)}
          tintColors={{ true: '#f76769', false: '#222680' }}
        />
        <AreaNome>Todas as áreas</AreaNome>
      </TodosBox>

      <FlatList
        keyExtractor={area => area.id}
        data={areas}
        renderItem={({ item: area }) => {
          return (
            <AreasBox>
              <CheckBox
                value={area.checked}
                onValueChange={() => handleAreasSelecionadas(area)}
                tintColors={{ true: '#f76769', false: '#222680' }}
              />
              <AreaNome>{area.nome}</AreaNome>
            </AreasBox>
          );
        }}
      />
      <VoltarButton onPress={fecharModalArea}>
        <Icon name="arrow-left" size={20} color="#FFF" />
        <VoltarText>Fechar</VoltarText>
      </VoltarButton>
    </Container>
  );
};

export default AreasCheckbox;
