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
  AreaNome,
  AreasBox,
  Icon,
  TodosBox,
  VoltarButton,
  VoltarText,
  ButtonBox,
} from './styles';
import { useAreasSelecionadas } from '../../hooks/areas';

interface IArea {
  nome: string;
  id: string;
  checked: boolean;
}

const AreasCheckbox: React.FC = () => {
  const [areas, setAreas] = useState<IArea[]>([]);
  const {
    areasSelecionadas,
    handleSetAreasSelecionadas,
  } = useAreasSelecionadas();
  const [todosAreas, setTodosAreas] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

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

  useEffect(() => {
    if (areasSelecionadas.length > 0) setIsFilled(true);
    else setIsFilled(false);
  }, [areasSelecionadas.length]);

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
      <ButtonBox>
        <CheckboxButton onPress={() => setModalAberto(true)}>
          <Icon
            name="lightbulb-on"
            size={16}
            color={isFilled ? '#f76769' : '#f1faee'}
          />
          <ButtonText>Áreas</ButtonText>
        </CheckboxButton>
      </ButtonBox>

      <Modal visible={modalAberto}>
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
        <VoltarButton onPress={() => setModalAberto(false)}>
          <Icon name="arrow-left" size={20} color="#FFF" />
          <VoltarText>Fechar</VoltarText>
        </VoltarButton>
      </Modal>
    </Container>
  );
};

export default AreasCheckbox;
