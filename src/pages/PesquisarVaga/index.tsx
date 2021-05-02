import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Header from '../../components/Header';
import VagaCard from '../../components/VagaCard';
import IVaga from '../../interfaces/IVaga';
import api from '../../services/api';
import {
  Container,
  FilterBox,
  FilterOption,
  FilterOptionText,
  Title,
  VagasList,
  VagasListTitle,
} from './styles';

const PesquisarVaga: React.FC = () => {
  const [vagas, setVagas] = useState<IVaga[]>([]);

  const [laboratorios, setLaboratorios] = useState<string[]>(['1']);
  const [professor, setProfessor] = useState('Flávio Mello');
  const [areas, setAreas] = useState<string[]>([]);
  const [cursos, setCursos] = useState<string[]>(['2']);
  const [esAberta, setEsAberta] = useState(true);
  const [esPreenchida, setEsPreenchida] = useState(false);

  // useEffect(() => {
  //   console.log('vagas: ', vagas);
  // }, [vagas]);

  const handlePesquisar = useCallback(() => {
    async function loadData() {
      await api
        .get(
          `/vagas_ic/search?esAberta=${esAberta}&esPreenchida=${esPreenchida}&professor=${professor}&cursos=${cursos}&areas=${areas}&laboratorios=${laboratorios}`,
        )
        .then(response => {
          setVagas(response.data);
        });
      // .catch(err => {
      //   const { data } = err.response;

      //   Alert.alert('Erro na criação da vaga', data.message);
      // });
    }

    loadData();
  }, [areas, cursos, esAberta, esPreenchida, laboratorios, professor]);

  return (
    <Container>
      <Header />
      <Title>Buscar vagas de IC</Title>
      <FilterBox>
        <FilterOption>
          <FilterOptionText>Laboratório</FilterOptionText>
        </FilterOption>
        <FilterOption>
          <FilterOptionText>Cursos</FilterOptionText>
        </FilterOption>
        <FilterOption>
          <FilterOptionText>Áreas</FilterOptionText>
        </FilterOption>
        <FilterOption>
          <FilterOptionText>Oi</FilterOptionText>
        </FilterOption>
      </FilterBox>
      <FilterOption onPress={handlePesquisar}>
        <FilterOptionText>Pesquisar</FilterOptionText>
      </FilterOption>
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
};

export default PesquisarVaga;
