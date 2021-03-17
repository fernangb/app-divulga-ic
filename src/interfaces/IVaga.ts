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
}

interface ICurso {
  nome: string;
}

export default interface IVaga {
  id: string;
  nome: string;
  descricao: string;
  vl_bolsa: number;
  hr_semana: number;
  cr_minimo: number;
  periodo_minimo: number;
  nr_vagas: number;
  laboratorio: ILab;
  professor: IProfessor;
  area: IArea;
  curso: ICurso;
}
