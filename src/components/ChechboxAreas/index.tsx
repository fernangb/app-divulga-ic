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
  TodasBox,
  VoltarButton,
  VoltarText,
  ButtonBox,
} from './styles';
import { useAreas } from '../../hooks/areas';

interface IArea {
  nome: string;
  id: string;
  checked: boolean;
}

const AreasCheckbox: React.FC = () => {
  const [areas, setAreas] = useState<IArea[]>([]);
  const { areasSelecionadas, handleSetAreasSelecionadas } = useAreas();
  const [todosAreas, setTodasAreas] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (areas.length === 0) handleSetAreasSelecionadas([]);
  }, [areas.length, handleSetAreasSelecionadas]);

  useEffect(() => {
    async function loadData() {
      await api.get('/areas').then(response => {
        const dados = response.data.map((area: IArea) => {
          if (areasSelecionadas.find(nome => area.nome === nome))
            area.checked = true;
          else area.checked = false;

          return area;
        });

        setAreas(dados);
      });
    }
    loadData();
  }, [areasSelecionadas]);

  useEffect(() => {
    if (areasSelecionadas.length > 0) setIsFilled(true);
    else setIsFilled(false);

    if (areasSelecionadas.length === areas.length) setTodasAreas(true);
  }, [areas.length, areasSelecionadas.length]);

  const handleAreasSelecionadas = useCallback(
    (areaSelecionado: IArea) => {
      const areasAtualizados = areas.map(area => {
        if (area.nome === areaSelecionado.nome) area.checked = !area.checked;

        return area;
      });

      setAreas(areasAtualizados);

      const areasMarcados = areas.filter(area => area.checked === true);

      const nomes = areasMarcados.map(area => area.nome);

      if (areasMarcados.length === areas.length) setTodasAreas(true);
      else setTodasAreas(false);

      handleSetAreasSelecionadas(nomes);
    },
    [areas, handleSetAreasSelecionadas],
  );

  const handleTodasAreas = useCallback(
    selecionaTudo => {
      setTodasAreas(selecionaTudo);

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
        <TodasBox>
          <CheckBox
            value={todosAreas}
            onValueChange={e => handleTodasAreas(e)}
            tintColors={{ true: '#f76769', false: '#222680' }}
          />
          <AreaNome>Todas as áreas</AreaNome>
        </TodasBox>

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
