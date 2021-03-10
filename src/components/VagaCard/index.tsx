/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  VagaInfo,
  VagaNome,
  VagaMeta,
  VagaMetaText,
} from './styles';

export interface IVagas {
  id: string;
  id_curso: string;
  id_area: string;
  id_professor: string;
  id_laboratorio: string;
  nome: string;
  descricao: string;
  vl_bolsa: number;
  hr_semana: number;
  cr_minimo: number;
  periodo_minimo: number;
  nr_vagas: number;
  laboratorio: { nome: string; sigla: string };
  professor: { usuario: { avatar_url: string } };
}

interface ButtonProps extends RectButtonProperties {
  vaga: IVagas;
}

const VagaCard: React.FC<ButtonProps> = ({ vaga, ...rest }) => {
  return (
    <Container {...rest}>
      <VagaInfo>
        <VagaNome>{vaga.nome}</VagaNome>
        <VagaMeta>
          <Icon name="information" size={14} color="#f76769" />
          <VagaMetaText>{vaga.laboratorio.nome}</VagaMetaText>
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
      </VagaInfo>
    </Container>
  );
};

export default VagaCard;
