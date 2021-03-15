import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  VagaInfo,
  AlunoNome,
  VagaMeta,
  VagaMetaText,
  MaisInfoButton,
  VagaTitleContainer,
  VagaAvatar,
} from './styles';
import { IInscricao } from '../../interfaces/IInscricao';

interface ICardProps {
  inscricao: IInscricao;
}

const AlunoCard: React.FC<ICardProps> = ({ inscricao }) => {
  const [cardAberto, setCardAberto] = useState(false);

  if (cardAberto) {
    return (
      <Container>
        <VagaTitleContainer>
          <VagaAvatar source={{ uri: inscricao.aluno.usuario.avatar_url }} />
          <AlunoNome>
            {inscricao.aluno.usuario.nome} {inscricao.aluno.usuario.sobrenome}
          </AlunoNome>
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
            <VagaMetaText>{inscricao.vaga_ic.nome}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="calendar" size={14} color="#f76769" />
            <VagaMetaText>{inscricao.dt_inscricao}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="email" size={14} color="#f76769" />
            <VagaMetaText>{inscricao.aluno.usuario.email}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="school" size={14} color="#f76769" />
            <VagaMetaText>{inscricao.aluno.curso.nome}</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="progress-check" size={14} color="#f76769" />
            <VagaMetaText>{inscricao.aluno.periodo}° período</VagaMetaText>
          </VagaMeta>
          <VagaMeta>
            <Icon name="alpha-c-box" size={14} color="#f76769" />
            <VagaMetaText>CR: {inscricao.aluno.cr}</VagaMetaText>
          </VagaMeta>
        </VagaInfo>
      </Container>
    );
  }

  return (
    <Container>
      <VagaTitleContainer>
        <VagaAvatar source={{ uri: inscricao.aluno.usuario.avatar_url }} />
        <AlunoNome>
          {inscricao.aluno.usuario.nome} {inscricao.aluno.usuario.sobrenome}
        </AlunoNome>
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
          <VagaMetaText>{inscricao.vaga_ic.nome}</VagaMetaText>
        </VagaMeta>
        <VagaMeta>
          <Icon name="calendar" size={14} color="#f76769" />
          <VagaMetaText>{inscricao.dt_inscricao}</VagaMetaText>
        </VagaMeta>
      </VagaInfo>
    </Container>
  );
};

export default AlunoCard;
