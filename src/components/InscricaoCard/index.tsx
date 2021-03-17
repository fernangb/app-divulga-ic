import React, { useCallback, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  VagaInfo,
  VagaNome,
  VagaMeta,
  VagaMetaText,
  MaisInfoButton,
  VagaTitleContainer,
  InscricaoButton,
  InscricaoText,
} from './styles';
import api from '../../services/api';
import { IInscricao } from '../../interfaces/IInscricao';
import getFormattedDate from '../../utils/getFormattedDate';

interface ICardProps {
  inscricao: IInscricao;
}

const InscricaoCard: React.FC<ICardProps> = ({ inscricao }) => {
  const [cardAberto, setCardAberto] = useState(false);
  const { navigate } = useNavigation();

  const handleInscricao = useCallback(async (id: string) => {
    await api.delete(`/inscricoes_ic/${id}`);
    navigate('CancelarInscricaoVaga', { nome: inscricao.vaga_ic.nome });
  }, []);

  if (cardAberto) {
    return (
      <Container>
        <VagaTitleContainer>
          <VagaNome>{inscricao.vaga_ic.nome}</VagaNome>

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
            <VagaMetaText>{inscricao.vaga_ic.laboratorio.sigla}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="account-tie" size={14} color="#f76769" />
            <VagaMetaText>
              {inscricao.vaga_ic.professor.usuario.nome}{' '}
              {inscricao.vaga_ic.professor.usuario.sobrenome}
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="school" size={14} color="#f76769" />
            <VagaMetaText>{inscricao.vaga_ic.curso.nome}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="lightbulb-on" size={14} color="#f76769" />
            <VagaMetaText>{inscricao.vaga_ic.area.nome}</VagaMetaText>
          </VagaMeta>

          <VagaMeta>
            <Icon name="currency-usd" size={14} color="#f76769" />
            <VagaMetaText>
              R$
              {inscricao.vaga_ic.vl_bolsa}
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="alarm" size={14} color="#f76769" />
            <VagaMetaText>{inscricao.vaga_ic.hr_semana}h</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="alpha-c-box" size={14} color="#f76769" />
            <VagaMetaText>{inscricao.vaga_ic.cr_minimo}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="progress-check" size={14} color="#f76769" />
            <VagaMetaText>
              {inscricao.vaga_ic.periodo_minimo}° período
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="pound" size={14} color="#f76769" />
            <VagaMetaText>
              {inscricao.vaga_ic.nr_vagas}{' '}
              {inscricao.vaga_ic.nr_vagas === 1 ? 'vaga' : 'vagas'}
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="calendar-check" size={14} color="#f76769" />
            <VagaMetaText>
              {getFormattedDate(inscricao.dt_inscricao)}
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="information" size={14} color="#f76769" />
            <VagaMetaText>{inscricao.vaga_ic.descricao}</VagaMetaText>
          </VagaMeta>
        </VagaInfo>
        <InscricaoButton onPress={() => handleInscricao(inscricao.id)}>
          <Icon name="trash-can" color="#f76769" size={16} />
          <InscricaoText>Cancelar inscrição</InscricaoText>
        </InscricaoButton>
      </Container>
    );
  }

  return (
    <Container>
      <VagaTitleContainer>
        <VagaNome>{inscricao.vaga_ic.nome}</VagaNome>

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
          <VagaMetaText>{inscricao.vaga_ic.laboratorio.sigla}</VagaMetaText>
        </VagaMeta>
        <VagaMeta>
          <Icon name="account-tie" size={14} color="#f76769" />
          <VagaMetaText>
            {inscricao.vaga_ic.professor.usuario.nome}{' '}
            {inscricao.vaga_ic.professor.usuario.sobrenome}
          </VagaMetaText>
        </VagaMeta>

        <VagaMeta>
          <Icon name="calendar-check" size={14} color="#f76769" />
          <VagaMetaText>
            {getFormattedDate(inscricao.dt_inscricao)}
          </VagaMetaText>
        </VagaMeta>
      </VagaInfo>
      <InscricaoButton onPress={() => handleInscricao(inscricao.id)}>
        <Icon name="trash-can" color="#f76769" size={16} />
        <InscricaoText>Cancelar inscrição</InscricaoText>
      </InscricaoButton>
    </Container>
  );
};

export default InscricaoCard;
