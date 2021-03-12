import { IAluno } from './IAluno';
import { IVaga } from './IVaga';

export interface IInscricao {
  id: string;
  es_ativa: boolean;
  dt_inscricao: Date;
  vaga_ic: IVaga;
  aluno: IAluno;
}
