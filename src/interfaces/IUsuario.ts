interface Nivel {
  nome: string;
  id: string;
}

export interface IUsuario {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  nivel: Nivel;
  avatar_url: string;
}
