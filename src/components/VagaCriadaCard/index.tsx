/* eslint-disable array-callback-return */
import React, { useCallback, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
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
}

const VagaCriadaCard: React.FC<ICardProps> = ({ vaga }) => {
  const [cardAberto, setCardAberto] = useState(false);
  const { navigate } = useNavigation();

  const handleVerInscricoes = useCallback(
    (id: string) => {
      navigate('VerInscricoes', { vagaId: id });
    },
    [navigate],
  );

  const handleEditarVaga = useCallback(
    (id: string) => {
      navigate('VerInscricoes', { vagaId: id });
    },
    [navigate],
  );
  const handleExcluirVaga = useCallback(
    (id: string) => {
      navigate('VerInscricoes', { vagaId: id });
    },
    [navigate],
  );
  const handleFecharVaga = useCallback(
    (id: string) => {
      navigate('VerInscricoes', { vagaId: id });
    },
    [navigate],
  );

  if (cardAberto) {
    return (
      <Container>
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
            <Icon name="ticket" size={14} color="#f76769" />
            <VagaMetaText>
              {vaga.nrInscritos}{' '}
              {vaga.nrInscritos === 1 ? 'inscrito' : 'inscritos'}
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
            <Icon name="pound" size={14} color="#f76769" />
            <VagaMetaText>
              {vaga.nrVagas} {vaga.nrVagas === 1 ? 'vaga' : 'vagas'}
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="information" size={14} color="#f76769" />
            <VagaMetaText>{vaga.descricao}</VagaMetaText>
          </VagaMeta>
        </VagaInfo>
        <ButtonFooter>
          <VagaButton onPress={() => handleVerInscricoes(vaga.id)}>
            <Icon name="clipboard-list" color="#f76769" size={16} />
            <VagaButtonText>Ver inscrições</VagaButtonText>
          </VagaButton>
          <VagaButton onPress={() => handleEditarVaga(vaga.id)}>
            <Icon name="pencil" color="#f76769" size={16} />
            <VagaButtonText>Editar vaga</VagaButtonText>
          </VagaButton>
          <VagaButton onPress={() => handleFecharVaga(vaga.id)}>
            <Icon name="close-octagon" color="#f76769" size={16} />
            <VagaButtonText>Fechar vaga</VagaButtonText>
          </VagaButton>
          <VagaButton onPress={() => handleExcluirVaga(vaga.id)}>
            <Icon name="delete" color="#f76769" size={16} />
            <VagaButtonText>Excluir vaga</VagaButtonText>
          </VagaButton>
        </ButtonFooter>
      </Container>
    );
  }

  return (
    <Container>
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
          <Icon name="ticket" size={14} color="#f76769" />
          <VagaMetaText>
            {vaga.nrInscritos}{' '}
            {vaga.nrInscritos === 1 ? 'inscrito' : 'inscritos'}
          </VagaMetaText>
        </VagaMeta>

        <VagaMeta>
          <Icon name="currency-usd" size={14} color="#f76769" />
          <VagaMetaText>{getFormattedCurrency(vaga.vlBolsa)}</VagaMetaText>
        </VagaMeta>
        <VagaMeta>
          <Icon name="alarm" size={14} color="#f76769" />
          <VagaMetaText>{vaga.hrSemana} h</VagaMetaText>
        </VagaMeta>
      </VagaInfo>
      <ButtonFooter>
        <VagaButton onPress={() => handleVerInscricoes(vaga.id)}>
          <Icon name="clipboard-list" color="#f76769" size={16} />
          <VagaButtonText>Ver inscrições</VagaButtonText>
        </VagaButton>
        <VagaButton onPress={() => handleEditarVaga(vaga.id)}>
          <Icon name="pencil" color="#f76769" size={16} />
          <VagaButtonText>Editar vaga</VagaButtonText>
        </VagaButton>
        <VagaButton onPress={() => handleFecharVaga(vaga.id)}>
          <Icon name="close-octagon" color="#f76769" size={16} />
          <VagaButtonText>Fechar vaga</VagaButtonText>
        </VagaButton>
        <VagaButton onPress={() => handleExcluirVaga(vaga.id)}>
          <Icon name="delete" color="#f76769" size={16} />
          <VagaButtonText>Excluir vaga</VagaButtonText>
        </VagaButton>
      </ButtonFooter>
    </Container>
  );
};

export default VagaCriadaCard;
