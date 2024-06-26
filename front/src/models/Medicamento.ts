import { Setor } from "./Setor";

export interface Medicamento {
    id?: string;
    nome?: string;
    quantidadeDisponivel : number;
    descricao: string;
    setorId: string;
    setor?: Setor; 
    setorNome?: string; 
}
