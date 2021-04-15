import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native';
import getFormattedDate from '../../utils/getFormattedDate';

import {
  Container,
  AlunoInfo,
  AlunoNome,
  AlunoMeta,
  AlunoMetaText,
  MaisInfoButton,
  AlunoTitleContainer,
  ButtonFooter,
  AlunoButton,
  AlunoButtonText,
} from './styles';
import { IInscricao } from '../../interfaces/IInscricao';
import CardAvatar from '../CardAvatar';
import api from '../../services/api';

interface ICardProps {
  inscricao: IInscricao;
}

const AlunoCard: React.FC<ICardProps> = ({ inscricao }) => {
  const [cardAberto, setCardAberto] = useState(false);

  const handleSelecionar = useCallback(() => {
    Alert.alert('Selecionar Aluno', 'Tela ainda não está pronta.');

    // navigation.navigate('VerInscricoes', { vagaId: vaga.id });
  }, []);

  const handleMarcarReuniao = useCallback(() => {
    Alert.alert('Marcar Reunião', 'Tela ainda não está pronta.');

    // navigation.navigate('VerInscricoes', { vagaId: vaga.id });
  }, []);

  const handleEliminarAluno = useCallback(() => {
    async function sendData() {
      await api
        .put(`/inscricoes_ic/${inscricao.id}`)
        .then(response => {
          Alert.alert('Excluir vaga de IC', response.data.message);

          // navigation.navigate('DashboardProfessor');
          // const novasVagas = vagas.filter(vaga => vaga.id !== id);

          // setVagas(novasVagas);
        })
        .catch(err => {
          const { data } = err.response;
          Alert.alert('Erro ao excluir vaga de IC', data.message);
        });
    }

    Alert.alert('Eliminar aluno', 'Você tem certeza disso?', [
      { text: 'Sim', onPress: () => sendData() },
      { text: 'Não', onPress: () => {} },
    ]);

    // Alert.alert('Eliminar Aluno', 'Tela ainda não está pronta.');

    // navigation.navigate('VerInscricoes', { vagaId: vaga.id });
  }, [inscricao.id]);

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
            <AlunoMetaText>{inscricao.vagaIc.nome}</AlunoMetaText>
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
        <ButtonFooter>
          <AlunoButton onPress={() => handleSelecionar()}>
            <Icon name="check" color="#f76769" size={16} />
            <AlunoButtonText>Selecionar</AlunoButtonText>
          </AlunoButton>
          <AlunoButton onPress={() => handleMarcarReuniao()}>
            <Icon name="calendar" color="#f76769" size={16} />
            <AlunoButtonText>Marcar reunião</AlunoButtonText>
          </AlunoButton>
          <AlunoButton onPress={() => handleEliminarAluno()}>
            <Icon name="delete" color="#f76769" size={16} />
            <AlunoButtonText>Eliminar</AlunoButtonText>
          </AlunoButton>
        </ButtonFooter>
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
          <AlunoMetaText>{inscricao.vagaIc.nome}</AlunoMetaText>
        </AlunoMeta>
        <AlunoMeta>
          <Icon name="calendar" size={14} color="#f76769" />
          <AlunoMetaText>
            {getFormattedDate(inscricao.dtInscricao)}
          </AlunoMetaText>
        </AlunoMeta>
      </AlunoInfo>
      <ButtonFooter>
        <AlunoButton onPress={() => handleSelecionar()}>
          <Icon name="check" color="#f76769" size={16} />
          <AlunoButtonText>Selecionar</AlunoButtonText>
        </AlunoButton>
        <AlunoButton onPress={() => handleMarcarReuniao()}>
          <Icon name="calendar" color="#f76769" size={16} />
          <AlunoButtonText>Marcar reunião</AlunoButtonText>
        </AlunoButton>
        <AlunoButton onPress={() => handleEliminarAluno()}>
          <Icon name="delete" color="#f76769" size={16} />
          <AlunoButtonText>Eliminar</AlunoButtonText>
        </AlunoButton>
      </ButtonFooter>
    </Container>
  );
};

export default AlunoCard;
