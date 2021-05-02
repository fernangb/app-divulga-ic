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
  LaboratorioNome,
  LaboratoriosBox,
  Icon,
  TodosBox,
  VoltarButton,
  VoltarText,
  ButtonBox,
} from './styles';
import { useLaboratorios } from '../../hooks/laboratorios';

interface ILaboratorio {
  nome: string;
  id: string;
  checked: boolean;
}

const LaboratoriosCheckbox: React.FC = () => {
  const [laboratorios, setLaboratorios] = useState<ILaboratorio[]>([]);
  const {
    laboratoriosSelecionados,
    handleSetLaboratoriosSelecionados,
  } = useLaboratorios();
  const [todosLaboratorios, setTodosLaboratorios] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (laboratorios.length === 0) handleSetLaboratoriosSelecionados([]);
  }, [laboratorios.length, handleSetLaboratoriosSelecionados]);

  useEffect(() => {
    async function loadData() {
      await api.get('/laboratorios').then(response => {
        const dados = response.data.map((laboratorio: ILaboratorio) => {
          if (laboratoriosSelecionados.find(nome => laboratorio.nome === nome))
            laboratorio.checked = true;
          else laboratorio.checked = false;

          return laboratorio;
        });

        setLaboratorios(dados);
      });
    }
    loadData();
  }, [laboratoriosSelecionados]);

  useEffect(() => {
    if (laboratoriosSelecionados.length > 0) setIsFilled(true);
    else setIsFilled(false);

    if (
      laboratoriosSelecionados.length === laboratorios.length &&
      laboratorios.length > 0
    )
      setTodosLaboratorios(true);
  }, [laboratorios.length, laboratoriosSelecionados.length]);

  const handleLaboratoriosSelecionados = useCallback(
    (laboratorioSelecionado: ILaboratorio) => {
      const laboratoriosAtualizados = laboratorios.map(laboratorio => {
        if (laboratorio.nome === laboratorioSelecionado.nome)
          laboratorio.checked = !laboratorio.checked;

        return laboratorio;
      });

      setLaboratorios(laboratoriosAtualizados);

      const laboratoriosMarcados = laboratorios.filter(
        laboratorio => laboratorio.checked === true,
      );

      const nomes = laboratoriosMarcados.map(laboratorio => laboratorio.nome);

      if (laboratoriosMarcados.length === laboratorios.length)
        setTodosLaboratorios(true);
      else setTodosLaboratorios(false);

      handleSetLaboratoriosSelecionados(nomes);
    },
    [laboratorios, handleSetLaboratoriosSelecionados],
  );

  const handleTodosLaboratorios = useCallback(
    selecionaTudo => {
      setTodosLaboratorios(selecionaTudo);

      const tudo = laboratorios.map(laboratorio => {
        laboratorio.checked = selecionaTudo;

        return laboratorio;
      });

      setLaboratorios(tudo);

      if (selecionaTudo) {
        const nomes = tudo.map(laboratorio => laboratorio.nome);

        handleSetLaboratoriosSelecionados(nomes);
      } else {
        handleSetLaboratoriosSelecionados([]);
      }
    },
    [laboratorios, handleSetLaboratoriosSelecionados],
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
          <ButtonText>Laboratorios</ButtonText>
        </CheckboxButton>
      </ButtonBox>

      <Modal visible={modalAberto}>
        <TodosBox>
          <CheckBox
            value={todosLaboratorios}
            onValueChange={e => handleTodosLaboratorios(e)}
            tintColors={{ true: '#f76769', false: '#222680' }}
          />
          <LaboratorioNome>Todos os laboratórios</LaboratorioNome>
        </TodosBox>

        <FlatList
          keyExtractor={laboratorio => laboratorio.id}
          data={laboratorios}
          renderItem={({ item: laboratorio }) => {
            return (
              <LaboratoriosBox>
                <CheckBox
                  value={laboratorio.checked}
                  onValueChange={() =>
                    handleLaboratoriosSelecionados(laboratorio)
                  }
                  tintColors={{ true: '#f76769', false: '#222680' }}
                />
                <LaboratorioNome>{laboratorio.nome}</LaboratorioNome>
              </LaboratoriosBox>
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

export default LaboratoriosCheckbox;
