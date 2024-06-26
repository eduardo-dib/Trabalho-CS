import { Setor } from "./Setor";

export interface Medico {
  id?: string;
  nome: string;
  genero: string;
  especialidade: string;
  crm: number;
  telefone: string;
  descricao: string;
  setorId: string;
  setorNome?: string; 
  setor?: Setor;
}