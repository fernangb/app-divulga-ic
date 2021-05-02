import React, { useCallback, useState } from 'react';
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
  FilterOptionText,
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

  // useEffect(() => {
  //   console.log('vagas: ', vagas);
  // }, [vagas]);

  const handlePesquisar = useCallback(() => {
    async function loadData() {
      await api
        .get(
          `/vagas_ic/search?esAberta=${esAberta}&esPreenchida=${esPreenchida}&professor=${professor}&cursos=${cursosSelecionados}&areas=${areasSelecionadas}&laboratorios=${laboratoriosSelecionados}`,
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
  }, [
    areasSelecionadas,
    cursosSelecionados,
    esAberta,
    esPreenchida,
    laboratoriosSelecionados,
    professor,
  ]);

  return (
    <Container>
      <Header />
      <Title>Buscar vagas de IC</Title>
      <FilterBox>
        <CheckboxCursos />
        <CheckboxAreas />
        <CheckboxLaboratorios />
        {/* <FilterOption>
          <CheckboxCursos />
        </FilterOption>
        <FilterOption>
          <CheckboxAreas />
        </FilterOption>
        <FilterOption>
          <CheckboxLaboratorios />
        </FilterOption> */}
      </FilterBox>
      <FilterOption onPress={handlePesquisar}>
        <FilterOptionText>Pesquisar</FilterOptionText>
      </FilterOption>
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
};

export default PesquisarVaga;
