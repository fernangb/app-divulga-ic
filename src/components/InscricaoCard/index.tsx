import React, { useCallback, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  InscricaoInfo,
  InscricaoNome,
  InscricaoMeta,
  InscricaoMetaText,
  MaisInfoButton,
  InscricaoTitleContainer,
  CancelarInscricaoButton,
  CancelarInscricaoText,
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
    navigate('CancelarInscricaoInscricao', { nome: inscricao.vaga_ic.nome });
  }, []);

  if (cardAberto) {
    return (
      <Container>
        <InscricaoTitleContainer>
          <InscricaoNome>{inscricao.vaga_ic.nome}</InscricaoNome>

          <MaisInfoButton
            onPress={() => {
              setCardAberto(false);
            }}
          >
            <Icon name="chevron-up" size={24} color="#f76769" />
          </MaisInfoButton>
        </InscricaoTitleContainer>

        <InscricaoInfo>
          <InscricaoMeta>
            <Icon
              name="filter"
              color="#f76769"
              size={14}
              style={{ transform: [{ rotateZ: '180deg' }] }}
            />
            <InscricaoMetaText>
              {inscricao.vaga_ic.laboratorio.sigla}
            </InscricaoMetaText>
          </InscricaoMeta>
          <InscricaoMeta>
            <Icon name="account-tie" size={14} color="#f76769" />
            <InscricaoMetaText>
              {inscricao.vaga_ic.professor.usuario.nome}{' '}
              {inscricao.vaga_ic.professor.usuario.sobrenome}
            </InscricaoMetaText>
          </InscricaoMeta>
          <InscricaoMeta>
            <Icon name="school" size={14} color="#f76769" />
            <InscricaoMetaText>
              {inscricao.vaga_ic.curso.nome}
            </InscricaoMetaText>
          </InscricaoMeta>
          <InscricaoMeta>
            <Icon name="lightbulb-on" size={14} color="#f76769" />
            <InscricaoMetaText>{inscricao.vaga_ic.area.nome}</InscricaoMetaText>
          </InscricaoMeta>

          <InscricaoMeta>
            <Icon name="currency-usd" size={14} color="#f76769" />
            <InscricaoMetaText>
              R$
              {inscricao.vaga_ic.vl_bolsa}
            </InscricaoMetaText>
          </InscricaoMeta>
          <InscricaoMeta>
            <Icon name="alarm" size={14} color="#f76769" />
            <InscricaoMetaText>
              {inscricao.vaga_ic.hr_semana}h
            </InscricaoMetaText>
          </InscricaoMeta>
          <InscricaoMeta>
            <Icon name="alpha-c-box" size={14} color="#f76769" />
            <InscricaoMetaText>{inscricao.vaga_ic.cr_minimo}</InscricaoMetaText>
          </InscricaoMeta>
          <InscricaoMeta>
            <Icon name="progress-check" size={14} color="#f76769" />
            <InscricaoMetaText>
              {inscricao.vaga_ic.periodo_minimo}° período
            </InscricaoMetaText>
          </InscricaoMeta>
          <InscricaoMeta>
            <Icon name="pound" size={14} color="#f76769" />
            <InscricaoMetaText>
              {inscricao.vaga_ic.nr_vagas}{' '}
              {inscricao.vaga_ic.nr_vagas === 1 ? 'vaga' : 'vagas'}
            </InscricaoMetaText>
          </InscricaoMeta>
          <InscricaoMeta>
            <Icon name="calendar-check" size={14} color="#f76769" />
            <InscricaoMetaText>
              {getFormattedDate(inscricao.dt_inscricao)}
            </InscricaoMetaText>
          </InscricaoMeta>
          <InscricaoMeta>
            <Icon name="information" size={14} color="#f76769" />
            <InscricaoMetaText>{inscricao.vaga_ic.descricao}</InscricaoMetaText>
          </InscricaoMeta>
        </InscricaoInfo>
        <CancelarInscricaoButton onPress={() => handleInscricao(inscricao.id)}>
          <Icon name="trash-can" color="#f76769" size={16} />
          <CancelarInscricaoText>Cancelar inscrição</CancelarInscricaoText>
        </CancelarInscricaoButton>
      </Container>
    );
  }

  return (
    <Container>
      <InscricaoTitleContainer>
        <InscricaoNome>{inscricao.vaga_ic.nome}</InscricaoNome>

        <MaisInfoButton
          onPress={() => {
            setCardAberto(true);
          }}
        >
          <Icon name="chevron-down" size={24} color="#f76769" />
        </MaisInfoButton>
      </InscricaoTitleContainer>

      <InscricaoInfo>
        <InscricaoMeta>
          <Icon
            name="filter"
            color="#f76769"
            size={14}
            style={{ transform: [{ rotateZ: '180deg' }] }}
          />
          <InscricaoMetaText>
            {inscricao.vaga_ic.laboratorio.sigla}
          </InscricaoMetaText>
        </InscricaoMeta>
        <InscricaoMeta>
          <Icon name="account-tie" size={14} color="#f76769" />
          <InscricaoMetaText>
            {inscricao.vaga_ic.professor.usuario.nome}{' '}
            {inscricao.vaga_ic.professor.usuario.sobrenome}
          </InscricaoMetaText>
        </InscricaoMeta>

        <InscricaoMeta>
          <Icon name="calendar-check" size={14} color="#f76769" />
          <InscricaoMetaText>
            {getFormattedDate(inscricao.dt_inscricao)}
          </InscricaoMetaText>
        </InscricaoMeta>
      </InscricaoInfo>
      <CancelarInscricaoButton onPress={() => handleInscricao(inscricao.id)}>
        <Icon name="trash-can" color="#f76769" size={16} />
        <CancelarInscricaoText>Cancelar inscrição</CancelarInscricaoText>
      </CancelarInscricaoButton>
    </Container>
  );
};

export default InscricaoCard;
