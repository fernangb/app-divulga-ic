import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import getFormattedDate from '../../utils/getFormattedDate';

import {
  Container,
  AlunoInfo,
  AlunoNome,
  AlunoMeta,
  AlunoMetaText,
  MaisInfoButton,
  AlunoTitleContainer,
  NomeBox,
} from './styles';
import { IInscricao } from '../../interfaces/IInscricao';
import CardAvatar from '../CardAvatar';

interface ICardProps {
  inscricao: IInscricao;
}

const AlunoCard: React.FC<ICardProps> = ({ inscricao }) => {
  const [cardAberto, setCardAberto] = useState(false);

  if (cardAberto) {
    return (
      <Container>
        <AlunoTitleContainer>
          <CardAvatar avatar_url={inscricao.aluno.usuario.avatar_url} />
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
        </AlunoTitleContainer>
        <AlunoInfo>
          <AlunoMeta>
            <Icon
              name="filter"
              color="#f76769"
              size={14}
              style={{ transform: [{ rotateZ: '180deg' }] }}
            />
            <AlunoMetaText>{inscricao.vaga_ic.nome}</AlunoMetaText>
          </AlunoMeta>
          <AlunoMeta>
            <Icon name="calendar" size={14} color="#f76769" />
            <AlunoMetaText>
              {getFormattedDate(inscricao.dtInscricao)}
              {/* {format(inscricao.dtInscricao, 'dd/MM/yyyy HH:mm:ss')} */}
            </AlunoMetaText>
          </AlunoMeta>
          <AlunoMeta>
            <Icon name="email" size={14} color="#f76769" />
            <AlunoMetaText>{inscricao.aluno.usuario.email}</AlunoMetaText>
          </AlunoMeta>
          <AlunoMeta>
            <Icon name="school" size={14} color="#f76769" />
            <AlunoMetaText>{inscricao.aluno.curso.nome}</AlunoMetaText>
          </AlunoMeta>
          <AlunoMeta>
            <Icon name="progress-check" size={14} color="#f76769" />
            <AlunoMetaText>{inscricao.aluno.periodo}° período</AlunoMetaText>
          </AlunoMeta>
          <AlunoMeta>
            <Icon name="alpha-c-box" size={14} color="#f76769" />
            <AlunoMetaText>
              CR:{' '}
              {inscricao.aluno.cr
                ? inscricao.aluno.cr?.toFixed(1)
                : 'Não informado'}
            </AlunoMetaText>
          </AlunoMeta>
        </AlunoInfo>
      </Container>
    );
  }

  return (
    <Container>
      <AlunoTitleContainer>
        <CardAvatar avatar_url={inscricao.aluno.usuario.avatar_url} />
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
      </AlunoTitleContainer>
      <AlunoInfo>
        <AlunoMeta>
          <Icon
            name="filter"
            color="#f76769"
            size={14}
            style={{ transform: [{ rotateZ: '180deg' }] }}
          />
          <AlunoMetaText>{inscricao.vaga_ic.nome}</AlunoMetaText>
        </AlunoMeta>
        <AlunoMeta>
          <Icon name="calendar" size={14} color="#f76769" />
          <AlunoMetaText>
            {getFormattedDate(inscricao.dtInscricao)}
            {/* {format(inscricao.dtInscricao, 'dd/MM/yyyy HH:mm:ss')} */}
          </AlunoMetaText>
        </AlunoMeta>
      </AlunoInfo>
    </Container>
  );
};

export default AlunoCard;
