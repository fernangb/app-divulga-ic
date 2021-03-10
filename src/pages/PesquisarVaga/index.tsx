import React, { useCallback, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Header,
  HeaderTitle,
  UserAvatar,
  VagasListContainer,
  VagasList,
} from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { UserName } from '../DashboardAluno/styles';

interface RouteParams {
  id: string;
}

 interface IVagas {
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

const PesquisarVaga: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const [vagas, setVagas] = useState<IVagas[]>([]);


  // const { id } = route.params as RouteParams;

  // console.log("Id: ",id);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api.get('/vagas_ic').then(response => {
      setVagas(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(vagas)
  }, [vagas]);

  return (
    <Container>
      <Header>
        {/* <BackButton onPress={navigateBack}>
          <Icon name="arrow-left" size={24} color="#222680" />
        </BackButton> */}
        <HeaderTitle>Pesquisar Vagas</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <VagasListContainer>
        <VagasList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={vagas}
          keyExtractor={(vaga) => vaga.id}
          renderItem={({item: vaga}) => (
            <UserName>{vaga.nome}</UserName>
          )}
        />
      </VagasListContainer>
    </Container>
  );
};

export default PesquisarVaga;
