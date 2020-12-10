/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Title } from './styles';
import logoImg from '../../assets/logo1.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Login</Title>
      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />
      <Button>Entrar</Button>
    </Container>
  );
};

export default SignIn;
