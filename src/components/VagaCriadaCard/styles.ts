import styled, { css } from 'styled-components/native';

interface IContainerProps {
  esPreenchida: boolean;
}

export const Container = styled.View<IContainerProps>`
  background: #222680;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 24px;
  flex-direction: column;
  align-items: flex-start;

  ${props =>
    props.esPreenchida &&
    css`
      border-color: #04d361;
      border-width: 5px;
    `}
`;

export const VagaTitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const MaisInfoButton = styled.TouchableOpacity`
  width: 5%;
`;

export const VagaInfo = styled.View``;

export const VagaNome = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #f76769;
  margin-left: 8px;
  margin-bottom: 16px;
  width: 95%;
`;

export const VagaMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  margin-left: 8px;
`;

export const VagaMetaText = styled.Text`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  margin-right: 8px;
`;

export const ViewOptions = styled.View``;

export const ButtonFooter = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
`;

export const VagaButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const VagaButtonText = styled.Text`
  color: #f76769;
  font-family: 'RobotoSlab-Regular';
  font-size: 12px;
  align-self: center;
  padding-left: 4px;
`;

export const VagaInfoListMeta = styled.View`
  flex-direction: column;
`;

export const VagaInfoListText = styled.Text`
  display: flex;
  flex-direction: row;
  margin-left: 48px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
`;
