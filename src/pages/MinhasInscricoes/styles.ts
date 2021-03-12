import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { IInscricao } from '../../interfaces/IInscricao';

export const Container = styled.View`
  flex: 1;
`;
export const Header = styled.View`
  padding: 8px;
  /* padding-top: ${getStatusBarHeight()}px; */
  background: #222680;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #f76769;
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
  /* border: 1px;
  border-color: #f76769; */
`;

export const InscricoesList = styled(
  FlatList as new () => FlatList<IInscricao>,
)`
  padding-bottom: 16px;
  margin: 16px;
`;

export const VagaAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-left: -8px;
  /* border: 1px;
  border-color: #f76769; */
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

export const Footer = styled.View`
  padding: 8px;
  /* padding-top: ${getStatusBarHeight()}px; */
  background: #222680;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const LabButton = styled.TouchableOpacity``;

export const BuscaButton = styled.TouchableOpacity``;

export const InscricoesButton = styled.TouchableOpacity``;
