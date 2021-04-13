import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import api from '../../services/api';
import { Container, VagasList, VagasListTitle } from './styles';

import Header from '../../components/Header';

import IVaga from '../../interfaces/IVaga';
import VagaCriadaCard from '../../components/VagaCriadaCard';

const DashboardProfessor: React.FC = () => {
  const [vagas, setVagas] = useState<IVaga[]>([]);

  useEffect(() => {
    api.get('/vagas_ic/professor/me').then(response => {
      setVagas(response.data);
    });
  }, []);

  const deleteVaga = useCallback(
    (id: string) => {
      async function sendData() {
        await api
          .delete(`/vagas_ic/${id}`)
          .then(response => {
            Alert.alert('Excluir vaga de IC', response.data.message);

            // navigation.navigate('DashboardProfessor');
            const novasVagas = vagas.filter(vaga => vaga.id !== id);

            setVagas(novasVagas);
          })
          .catch(err => {
            const { data } = err.response;
            Alert.alert('Erro ao excluir vaga de IC', data.message);
          });
      }

      Alert.alert('Excluir vaga de IC', 'Você tem certeza disso?', [
        { text: 'Sim', onPress: () => sendData() },
        { text: 'Não', onPress: () => {} },
      ]);
    },
    [vagas],
  );

  return (
    <Container>
      <Header />
      <VagasList
        keyExtractor={vaga => vaga.id}
        data={vagas}
        ListHeaderComponent={
          <VagasListTitle>
            Minhas vagas de IC criadas: {vagas.length}
          </VagasListTitle>
        }
        renderItem={({ item: vaga }) => (
          <VagaCriadaCard deleteVaga={deleteVaga} vaga={vaga} />
        )}
      />
    </Container>
  );
};

export default DashboardProfessor;
