/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useCallback, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import IVaga from '../../interfaces/IVaga';
import {
  Container,
  VagaInfo,
  VagaNome,
  VagaMeta,
  VagaMetaText,
  MaisInfoButton,
  VagaTitleContainer,
  VagaButton,
  VagaButtonText,
  VagaInfoListText,
  VagaInfoListMeta,
  ButtonFooter,
} from './styles';
import getFormattedCurrency from '../../utils/getFormattedCurrency';

interface ICardProps {
  vaga: IVaga;
  deleteVaga(id: string): void;
}

const VagaCriadaCard: React.FC<ICardProps> = ({ vaga, deleteVaga }) => {
  const [cardAberto, setCardAberto] = useState(false);
  const navigation = useNavigation();

  const handleVerInscricoes = useCallback(() => {
    if (vaga.nrInscritos === 0)
      Alert.alert('Inscrições', 'Nenhum aluno foi inscrito nessa vaga.');
    else navigation.navigate('VerInscricoes', { vagaId: vaga.id });
  }, [navigation, vaga.id, vaga.nrInscritos]);

  const handleEditarVaga = useCallback(() => {
    navigation.navigate('EditarVaga', { vaga });
  }, [navigation, vaga]);

  if (cardAberto) {
    return (
      <Container esPreenchida={vaga.esPreenchida}>
        <VagaTitleContainer>
          <VagaNome>{vaga.nome}</VagaNome>

          <MaisInfoButton
            onPress={() => {
              setCardAberto(false);
            }}
          >
            <Icon name="chevron-up" size={24} color="#f76769" />
          </MaisInfoButton>
        </VagaTitleContainer>

        <VagaInfo>
          <VagaMeta>
            <Icon
              name="filter"
              color="#f76769"
              size={14}
              style={{ transform: [{ rotateZ: '180deg' }] }}
            />
            <VagaMetaText>
              {vaga.laboratorio.sigla} - {vaga.laboratorio.nome}
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="pound" size={14} color="#f76769" />
            <VagaMetaText>
              {vaga.nrVagas} {vaga.nrVagas === 1 ? 'vaga' : 'vagas'}
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="ticket" size={14} color="#f76769" />
            <VagaMetaText>
              {vaga.nrInscritos}{' '}
              {vaga.nrInscritos === 1 ? 'inscrito' : 'inscritos'}
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="star" size={14} color="#f76769" />
            <VagaMetaText>
              {vaga.nrSelecionados}{' '}
              {vaga.nrSelecionados === 1 ? 'selecionado' : 'selecionados'}
            </VagaMetaText>
          </VagaMeta>
          <VagaInfoListMeta>
            <VagaMeta>
              <Icon name="school" size={14} color="#f76769" />
              <VagaMetaText>Cursos:</VagaMetaText>
            </VagaMeta>
            {vaga.cursos.map(curso => (
              <VagaInfoListText key={curso.id}>- {curso.nome}</VagaInfoListText>
            ))}
          </VagaInfoListMeta>
          <VagaInfoListMeta>
            <VagaMeta>
              <Icon name="lightbulb-on" size={14} color="#f76769" />
              <VagaMetaText>Áreas:</VagaMetaText>
            </VagaMeta>
            {vaga.areas.map(area => (
              <VagaInfoListText key={area.id}>- {area.nome}</VagaInfoListText>
            ))}
          </VagaInfoListMeta>

          <VagaMeta>
            <Icon name="currency-usd" size={14} color="#f76769" />
            <VagaMetaText>{getFormattedCurrency(vaga.vlBolsa)}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="alarm" size={14} color="#f76769" />
            <VagaMetaText>{vaga.hrSemana}h</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="alpha-c-box" size={14} color="#f76769" />
            <VagaMetaText>CR: {vaga.crMinimo.toFixed(1)}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="progress-check" size={14} color="#f76769" />
            <VagaMetaText>{vaga.periodoMinimo}° período</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="information" size={14} color="#f76769" />
            <VagaMetaText>{vaga.descricao}</VagaMetaText>
          </VagaMeta>
        </VagaInfo>
        <ButtonFooter>
          <VagaButton onPress={() => handleVerInscricoes()}>
            <Icon name="clipboard-list" color="#f76769" size={16} />
            <VagaButtonText>Inscrições</VagaButtonText>
          </VagaButton>
          <VagaButton onPress={() => handleEditarVaga()}>
            <Icon name="pencil" color="#f76769" size={16} />
            <VagaButtonText>Editar</VagaButtonText>
          </VagaButton>
          <VagaButton onPress={() => deleteVaga(vaga.id)}>
            <Icon name="delete" color="#f76769" size={16} />
            <VagaButtonText>Excluir</VagaButtonText>
          </VagaButton>
        </ButtonFooter>
      </Container>
    );
  }

  return (
    <Container esPreenchida={vaga.esPreenchida}>
      <VagaTitleContainer>
        <VagaNome>{vaga.nome}</VagaNome>

        <MaisInfoButton
          onPress={() => {
            setCardAberto(true);
          }}
        >
          <Icon name="chevron-down" size={24} color="#f76769" />
        </MaisInfoButton>
      </VagaTitleContainer>

      <VagaInfo>
        <VagaMeta>
          <Icon
            name="filter"
            color="#f76769"
            size={14}
            style={{ transform: [{ rotateZ: '180deg' }] }}
          />
          <VagaMetaText>
            {vaga.laboratorio.sigla} - {vaga.laboratorio.nome}
          </VagaMetaText>
        </VagaMeta>
        <VagaMeta>
          <Icon name="pound" size={14} color="#f76769" />
          <VagaMetaText>
            {vaga.nrVagas} {vaga.nrVagas === 1 ? 'vaga' : 'vagas'}
          </VagaMetaText>
        </VagaMeta>
        <VagaMeta>
          <Icon name="ticket" size={14} color="#f76769" />
          <VagaMetaText>
            {vaga.nrInscritos}{' '}
            {vaga.nrInscritos === 1 ? 'inscrito' : 'inscritos'}
          </VagaMetaText>
        </VagaMeta>
        <VagaMeta>
          <Icon name="star" size={14} color="#f76769" />
          <VagaMetaText>
            {vaga.nrSelecionados}{' '}
            {vaga.nrSelecionados === 1 ? 'selecionado' : 'selecionados'}
          </VagaMetaText>
        </VagaMeta>
      </VagaInfo>
      <ButtonFooter>
        <VagaButton onPress={() => handleVerInscricoes()}>
          <Icon name="clipboard-list" color="#f76769" size={16} />
          <VagaButtonText>Inscrições</VagaButtonText>
        </VagaButton>
        <VagaButton onPress={() => handleEditarVaga()}>
          <Icon name="pencil" color="#f76769" size={16} />
          <VagaButtonText>Editar</VagaButtonText>
        </VagaButton>
        <VagaButton onPress={() => deleteVaga(vaga.id)}>
          <Icon name="delete" color="#f76769" size={16} />
          <VagaButtonText>Excluir</VagaButtonText>
        </VagaButton>
      </ButtonFooter>
    </Container>
  );
};

export default VagaCriadaCard;
