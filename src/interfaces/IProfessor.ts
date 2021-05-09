import { IUsuario } from './IUsuario';

interface ICurso {
  nome: string;
  id: string;
}

interface ILab {
  nome: string;
  id: string;
  sigla: string;
}

export interface IProfessor {
  id: string;
  curso: ICurso;
  usuario: IUsuario;
  laboratorio: ILab;
  siape: string;
}
