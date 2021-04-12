import { IAluno } from './IAluno';
import IVaga from './IVaga';

export interface IInscricao {
  id: string;
  esAtiva: boolean;
  dtInscricao: Date;
  vagaIc: IVaga;
  aluno: IAluno;
}
