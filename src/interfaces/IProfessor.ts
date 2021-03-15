interface ICurso {
  nome: string;
}

interface IUsuario {
  nome: string;
  sobrenome: string;
  email: string;
}

interface ILab {
  nome: string;
}

export interface IProfessor {
  id: string;
  curso: ICurso;
  usuario: IUsuario;
  laboratorio: ILab;
}
