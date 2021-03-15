import React, { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { IVaga } from '../../interfaces/IVaga';
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
import { useAuth } from '../../hooks/auth';

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
        id_vaga: id,
        id_aluno: responseAluno.data.id,
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
            <VagaMetaText>{vaga.laboratorio.sigla}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="lightbulb-on" size={14} color="#f76769" />
            <VagaMetaText>Área: {vaga.area.nome}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="account-tie" size={14} color="#f76769" />
            <VagaMetaText>
              {vaga.professor.usuario.nome} {vaga.professor.usuario.sobrenome}
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="school" size={14} color="#f76769" />
            <VagaMetaText>{vaga.curso.nome}</VagaMetaText>
          </VagaMeta>

          <VagaMeta>
            <Icon name="currency-usd" size={14} color="#f76769" />
            <VagaMetaText>
              R$
              {vaga.vl_bolsa}
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="alarm" size={14} color="#f76769" />
            <VagaMetaText>{vaga.hr_semana}h</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="alpha-c-box" size={14} color="#f76769" />
            <VagaMetaText>CR: {vaga.cr_minimo}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="progress-check" size={14} color="#f76769" />
            <VagaMetaText>{vaga.periodo_minimo}° período</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="pound" size={14} color="#f76769" />
            <VagaMetaText>
              {vaga.nr_vagas} {vaga.nr_vagas === 1 ? 'vaga' : 'vagas'}
            </VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="information" size={14} color="#f76769" />
            <VagaMetaText>{vaga.descricao}</VagaMetaText>
          </VagaMeta>
        </VagaInfo>
        <InscricaoButton onPress={() => handleInscricao(vaga.id)}>
          <Icon name="plus-circle" color="#f76769" size={16} />
          <InscricaoText>Inscreva-se</InscricaoText>
        </InscricaoButton>
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
          <VagaMetaText>{vaga.laboratorio.sigla}</VagaMetaText>
        </VagaMeta>
        <VagaMeta>
          <Icon name="account-tie" size={14} color="#f76769" />
          <VagaMetaText>
            {vaga.professor.usuario.nome} {vaga.professor.usuario.sobrenome}
          </VagaMetaText>
        </VagaMeta>

        <VagaMeta>
          <Icon name="currency-usd" size={14} color="#f76769" />
          <VagaMetaText>R$ {vaga.vl_bolsa}</VagaMetaText>
        </VagaMeta>
        <VagaMeta>
          <Icon name="alarm" size={14} color="#f76769" />
          <VagaMetaText>{vaga.hr_semana} h</VagaMetaText>
        </VagaMeta>
      </VagaInfo>
      <InscricaoButton onPress={() => handleInscricao(vaga.id)}>
        <Icon name="plus-circle" color="#f76769" size={16} />
        <InscricaoText>Inscreva-se</InscricaoText>
      </InscricaoButton>
    </Container>
  );
};

export default VagaCard;
