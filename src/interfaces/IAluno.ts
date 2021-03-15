import { IUsuario } from './IUsuario';

interface ICurso {
  nome: string;
}

export interface IAluno {
  id: string;
  dre: string;
  periodo: number;
  cr?: number;
  curso: ICurso;
  usuario: IUsuario;
}
