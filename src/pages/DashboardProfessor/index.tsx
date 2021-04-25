import React, { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import api from '../../services/api';
import { Container, VagasList, VagasListTitle } from './styles';

import Header from '../../components/Header';

import VagaCriadaCard from '../../components/VagaCriadaCard';
import { useVagasCriadas } from '../../hooks/vagasCriadas';

const DashboardProfessor: React.FC = () => {
  const {
    vagasCriadas,
    handleSetVagasCriadas,
    atualizarVagasCriadas,
  } = useVagasCriadas();

  useEffect(() => {
    atualizarVagasCriadas();
  }, [atualizarVagasCriadas]);

  const deleteVaga = useCallback(
    (id: string) => {
      async function sendData() {
        await api
          .delete(`/vagas_ic/${id}`)
          .then(response => {
            Alert.alert('Excluir vaga de IC', response.data.message);

            const novasVagas = vagasCriadas.filter(vaga => vaga.id !== id);

            handleSetVagasCriadas(novasVagas);
            atualizarVagasCriadas();
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
    [handleSetVagasCriadas, vagasCriadas],
  );

  return (
    <Container>
      <Header />
      <VagasList
        keyExtractor={vaga => vaga.id}
        data={vagasCriadas}
        ListHeaderComponent={
          <VagasListTitle>
            Minhas vagas de IC criadas: {vagasCriadas.length}
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
