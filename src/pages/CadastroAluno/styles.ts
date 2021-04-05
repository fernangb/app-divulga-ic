import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 125 : 40}px;
`;

export const LogoView = styled.View`
  flex: 1;
  width: 10%;
`;

export const Title = styled.Text`
  font-size: 48px;
  color: #f76769;
  font-family: 'BubblegumSans-Regular';
  margin: 64px 0 24px;
`;

export const VoltarSigInButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  border-color: #f76769;
  background: #222680;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const VoltarSigInText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;

export const ListCursos = styled.Picker`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const CursoContainer = styled.View`
  width: 90%;
  height: 60px;
  padding: 0 16px;
  background: #222680;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  border-width: 2px;
  border-color: #222680;
  /*
  ${props =>
    props.isErrored &&
    css`
      border-color: #cc0000;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #f76769;
    `} */
`;

export const Icon = styled(MaterialIcon)`
  margin-right: 16px;
`;
