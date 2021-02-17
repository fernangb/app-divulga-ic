import React, {useRef} from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Title, VoltarSigInButton, VoltarSigInText, LogoView } from './styles';
import logoImg from '../../assets/logo1.png';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';


const CadastroAluno: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios'? 'padding': undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
              {/* <Image source={logoImg} style = {{ width: 150, height: 100 }}/> */}
              <View>
              <Title>Crie a sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={() => {}}>
              <Input name="user" icon="user" placeholder="Nome completo" />
              <Input name="dre" icon="hash" placeholder="DRE" />
              <Input name="curso" icon="target" placeholder="Curso" />
              <Input name="email" icon="mail" placeholder="Email" />
              <Input name="password" icon="lock" placeholder="Senha" />
              <Input name="password2" icon="lock" placeholder="Repita a sua senha" />
              <Button onPress={() => formRef.current?.submitForm()}>Cadastrar</Button>
            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <VoltarSigInButton  onPress={() => navigation.navigate('Login')}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <VoltarSigInText>Voltar para Login</VoltarSigInText>
      </VoltarSigInButton>

    </>
  );
};

export default CadastroAluno;
