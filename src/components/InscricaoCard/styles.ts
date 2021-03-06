import styled, { css } from 'styled-components/native';

interface IContainerProps {
  esAtiva: boolean;
}

export const Container = styled.View<IContainerProps>`
  background: #222680;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 24px;
  flex-direction: column;
  align-items: flex-start;

  ${props =>
    !props.esAtiva &&
    css`
      background: #9193c0;
    `}
`;

export const InscricaoTitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const MaisInfoButton = styled.TouchableOpacity`
  width: 5%;
`;

export const InscricaoInfo = styled.View``;

export const InscricaoNome = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #f76769;
  margin-left: 8px;
  margin-bottom: 16px;
  width: 95%;
`;

export const InscricaoMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  margin-left: 8px;
`;

export const InscricaoMetaText = styled.Text`
  margin-left: 12px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
  margin-right: 8px;
`;

export const CancelarInscricaoButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 8px;
`;

export const CancelarInscricaoText = styled.Text`
  color: #f76769;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  align-self: center;
  padding-left: 4px;
`;

export const InscricaoInfoListMeta = styled.View`
  flex-direction: column;
`;

export const IncricaoInfoListText = styled.Text`
  display: flex;
  flex-direction: row;
  margin-left: 48px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
`;
