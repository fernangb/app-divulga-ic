import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface IVagas {
  id: string;
  cursoId: string;
  areaId: string;
  professorId: string;
  laboratorioId: string;
  nome: string;
  descricao: string;
  vlBolsa: number;
  hrSemana: number;
  crMinimo: number;
  periodoMinimo: number;
  nrVagas: number;
  laboratorio: { nome: string; sigla: string };
  professor: { usuario: { avatar_url: string } };
}

export const Container = styled.View`
  flex: 1;
`;
export const Header = styled.View`
  padding: 8px;
  padding-top: ${getStatusBarHeight() + 8}px;
  background: #222680;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 20px;
`;

export const UserName = styled.Text`
  color: #f76769;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const VagasListContainer = styled.View`
  height: 112px;
`;

export const VagasList = styled(FlatList as new () => FlatList<IVagas>)`
  padding: 32px 24px;
`;

export const VagaCard = styled(RectButton)`
  background: #222680;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const VagaAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-left: -8px;
`;

export const VagaInfo = styled.View`
  flex: 1;
`;

export const VagaNome = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #fff;
  margin-left: 8px;
`;

export const VagaMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  margin-left: 8px;
`;

export const VagaMetaText = styled.Text`
  margin-left: 8px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;

export const VagasListTitle = styled.Text`
  margin-left: 8px;
  margin-bottom: 24px;
  color: #f76769;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
`;
