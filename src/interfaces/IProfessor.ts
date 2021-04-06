interface ICurso {
  nome: string;
  id: string;
}

interface IUsuario {
  nome: string;
  sobrenome: string;
  email: string;
}

interface ILab {
  nome: string;
  id: string;
}

export interface IProfessor {
  id: string;
  curso: ICurso;
  usuario: IUsuario;
  laboratorio: ILab;
}
