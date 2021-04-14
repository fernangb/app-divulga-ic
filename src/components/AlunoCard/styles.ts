import styled from 'styled-components/native';

export const Container = styled.View`
  background: #222680;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 24px;
  flex-direction: column;
  align-items: flex-start;
`;

export const AlunoTitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
`;

export const MaisInfoButton = styled.TouchableOpacity``;

export const AlunoInfo = styled.View``;

export const AlunoNome = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f76769;
  margin-left: 8px;
  margin-bottom: 16px;
  display: flex;
  flex: 1;
  padding-left: 4px;
`;

export const AlunoMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  margin-left: 8px;
`;

export const AlunoMetaText = styled.Text`
  margin-left: 12px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
`;

export const AlunoText = styled.Text`
  color: #f76769;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  align-self: center;
`;

export const ButtonFooter = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
`;

export const AlunoButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const AlunoButtonText = styled.Text`
  color: #f76769;
  font-family: 'RobotoSlab-Regular';
  font-size: 12px;
  align-self: center;
  padding-left: 4px;
`;
