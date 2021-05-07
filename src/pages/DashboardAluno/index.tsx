import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';
import { Container, LoadingView, VagasList, VagasListTitle } from './styles';

import Header from '../../components/Header';

import VagaCard from '../../components/VagaCard';
import IVaga from '../../interfaces/IVaga';
// import logoImg from '../../assets/logo1.png';

const DashboardAluno: React.FC = () => {
  const [vagas, setVagas] = useState<IVaga[]>([]);
  const [loading, setLoading] = useState(false);

  // const { navigate } = useNavigation();

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      await api.get('/vagas_ic/aluno/me').then(response => {
        setVagas(response.data);
      });
    }

    loadData();
    setLoading(false);
  }, []);

  // const handlePesquisarVagas = useCallback(() => {
  //   navigate('PesquisarVaga');
  // }, [navigate]);

  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingView>
          <ActivityIndicator animating size="large" color="#f76769" />
        </LoadingView>
      </Container>
    );
  }

  // if (vagas.length > 0) {
  return (
    <Container>
      <Header />
      <VagasList
        keyExtractor={vaga => vaga.id}
        data={vagas}
        ListHeaderComponent={
          <VagasListTitle>Vagas recomendadas: {vagas.length}</VagasListTitle>
        }
        renderItem={({ item: vaga }) => <VagaCard vaga={vaga} />}
      />
    </Container>
  );
  // }

  // return (
  //   <Container>
  //     <Header />
  //     <DescriptionBox>
  //       <Image source={logoImg} />

  //       <Description>
  //         Não existe nenhuma vaga recomendada disponível no momento
  //       </Description>
  //       <RedirectButton onPress={handlePesquisarVagas}>
  //         <RedirectButtonText>Buscar por mais vagas</RedirectButtonText>
  //       </RedirectButton>
  //     </DescriptionBox>
  //   </Container>
  // );
};

export default DashboardAluno;
