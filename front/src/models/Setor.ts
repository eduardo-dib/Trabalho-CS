import { Medico } from "./Medico";

export interface Setor{
    List: any;

    id?: string;
    nome: string;
    medicos: Medico[]; 
}