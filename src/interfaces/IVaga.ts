interface ILab {
  nome: string;
  sigla: string;
}

interface IUser {
  nome: string;
  sobrenome: string;
  email: string;
}

interface IProfessor {
  usuario: IUser;
}

interface IArea {
  nome: string;
  id: string;
}

interface ICurso {
  nome: string;
  id: string;
}

export default interface IVaga {
  id: string;
  nome: string;
  descricao: string;
  vlBolsa: number;
  hrSemana: number;
  crMinimo: number;
  periodoMinimo: number;
  nrVagas: number;
  laboratorio: ILab;
  professor: IProfessor;
  areas: IArea[];
  cursos: ICurso[];
  nrInscritos: number;
  nrSelecionados: number;
  esAtiva: boolean;
}
