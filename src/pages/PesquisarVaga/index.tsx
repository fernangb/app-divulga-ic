import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckboxCursos from '../../components/CheckboxCursos';
import CheckboxAreas from '../../components/ChechboxAreas';
import Header from '../../components/Header';
import VagaCard from '../../components/VagaCard';
import IVaga from '../../interfaces/IVaga';
import api from '../../services/api';
import {
  Container,
  FilterBox,
  FilterOption,
  LoadingView,
  SearchButton,
  SearchButtonText,
  Title,
  VagasList,
  VagasListTitle,
} from './styles';
import CheckboxLaboratorios from '../../components/CheckboxLaboratorios';
import { useCursos } from '../../hooks/cursos';
import { useAreas } from '../../hooks/areas';
import { useLaboratorios } from '../../hooks/laboratorios';

const PesquisarVaga: React.FC = () => {
  const [vagas, setVagas] = useState<IVaga[]>([]);

  const { cursosSelecionados } = useCursos();
  const { areasSelecionadas } = useAreas();
  const { laboratoriosSelecionados } = useLaboratorios();

  const [professor, setProfessor] = useState('Flávio Mello');
  const [esAberta, setEsAberta] = useState(true);
  const [esPreenchida, setEsPreenchida] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePesquisar = useCallback(() => {
    async function loadData() {
      setLoading(true);
      await api
        .get(
          `/vagas_ic/search?esAberta=${esAberta}&esPreenchida=${esPreenchida}&professor=${professor}&cursos=${cursosSelecionados.join(
            ',',
          )}&areas=${areasSelecionadas.join(
            ',',
          )}&laboratorios=${laboratoriosSelecionados.join(',')}`,
        )
        .then(response => {
          setVagas(response.data);
        })
        .catch(err => {
          const { data } = err.response;

          Alert.alert('Erro na criação da vaga', data.message);
        });
    }

    loadData();
    setLoading(false);
  }, [
    areasSelecionadas,
    cursosSelecionados,
    esAberta,
    esPreenchida,
    laboratoriosSelecionados,
    professor,
  ]);

  if (loading) {
    return (
      <Container>
        <Header />
        <Title>Buscar vagas de IC</Title>
        <FilterBox>
          <FilterOption>
            <CheckboxCursos />
          </FilterOption>
          <FilterOption>
            <CheckboxAreas />
          </FilterOption>
          <FilterOption>
            <CheckboxLaboratorios />
          </FilterOption>
        </FilterBox>
        <SearchButton onPress={handlePesquisar}>
          <Icon name="magnify" size={16} color="#fff" />
          <SearchButtonText>Pesquisar</SearchButtonText>
        </SearchButton>
        <LoadingView>
          <ActivityIndicator animating size="large" color="#f76769" />
        </LoadingView>
      </Container>
    );
  }

  if (vagas.length > 0) {
    return (
      <Container>
        <Header />
        <Title>Buscar vagas de IC</Title>
        <FilterBox>
          <FilterOption>
            <CheckboxCursos />
          </FilterOption>
          <FilterOption>
            <CheckboxAreas />
          </FilterOption>
          <FilterOption>
            <CheckboxLaboratorios />
          </FilterOption>
        </FilterBox>
        <SearchButton onPress={handlePesquisar}>
          <Icon name="magnify" size={20} color="#222680" />
          <SearchButtonText>Pesquisar</SearchButtonText>
        </SearchButton>
        <VagasList
          keyExtractor={vaga => vaga.id}
          data={vagas}
          ListHeaderComponent={
            <VagasListTitle>Vagas encontradas: {vagas.length}</VagasListTitle>
          }
          renderItem={({ item: vaga }) => <VagaCard vaga={vaga} />}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Title>Buscar vagas de IC</Title>
      <FilterBox>
        <FilterOption>
          <CheckboxCursos />
        </FilterOption>
        <FilterOption>
          <CheckboxAreas />
        </FilterOption>
        <FilterOption>
          <CheckboxLaboratorios />
        </FilterOption>
      </FilterBox>
      <SearchButton onPress={handlePesquisar}>
        <Icon name="magnify" size={20} color="#222680" />
        <SearchButtonText>Pesquisar</SearchButtonText>
      </SearchButton>
      <VagasList
        keyExtractor={vaga => vaga.id}
        data={vagas}
        renderItem={({ item: vaga }) => <VagaCard vaga={vaga} />}
      />
    </Container>
  );
};

export default PesquisarVaga;
