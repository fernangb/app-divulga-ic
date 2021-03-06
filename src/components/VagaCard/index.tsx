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
  ConfirmarInscricaoButton,
  ConfirmarInscricaoText,
  VagaInfoListText,
  VagaInfoListMeta,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import getFormattedCurrency from '../../utils/getFormattedCurrency';

interface ICardProps {
  vaga: IVaga;
}

const VagaCard: React.FC<ICardProps> = ({ vaga }) => {
  const { user } = useAuth();
  const [cardAberto, setCardAberto] = useState(false);
  const { navigate } = useNavigation();

  const handleInscricao = useCallback(
    async (id: string) => {
      const responseAluno = await api.get(`/alunos/${user.id}`);
      await api.post('/inscricoes_ic', {
        vagaIcId: id,
        alunoId: responseAluno.data.id,
      });

      navigate('ConfirmarInscricaoVaga', { nome: vaga.nome });
    },
    [navigate, user.id, vaga.nome],
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
            <Icon name="account-tie" size={14} color="#f76769" />
            <VagaMetaText>
              {vaga.professor.usuario.nome} {vaga.professor.usuario.sobrenome}
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
        <ConfirmarInscricaoButton onPress={() => handleInscricao(vaga.id)}>
          <Icon name="plus-circle" color="#f76769" size={16} />
          <ConfirmarInscricaoText>Inscreva-se</ConfirmarInscricaoText>
        </ConfirmarInscricaoButton>
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
          <Icon name="account-tie" size={14} color="#f76769" />
          <VagaMetaText>
            {vaga.professor.usuario.nome} {vaga.professor.usuario.sobrenome}
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
      <ConfirmarInscricaoButton onPress={() => handleInscricao(vaga.id)}>
        <Icon name="plus-circle" color="#f76769" size={16} />
        <ConfirmarInscricaoText>Inscreva-se</ConfirmarInscricaoText>
      </ConfirmarInscricaoButton>
    </Container>
  );
};

export default VagaCard;
