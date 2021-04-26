import { IAluno } from './IAluno';
import IVaga from './IVaga';

export interface IInscricao {
  id: string;
  esAtiva: boolean;
  esSelecionado: boolean;
  dtInscricao: Date;
  vagaIc: IVaga;
  aluno: IAluno;
}
