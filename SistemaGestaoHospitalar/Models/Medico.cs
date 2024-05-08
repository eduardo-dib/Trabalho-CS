namespace SistemaGestaoHospitalar.Models;

public class Medico{
 
    private static int proximoId = 1;
    public int Id {get; set;}
    public string? Nome {get;set;}
    public string? Genero{get;set;}
    public string? Especialidade{get;set;}
    public long Crm {get;set;}
    public string? Telefone {get;set;}
    public string? Descricao{get;set;}

       public Medico(string nome, string genero, string especialidade, long crm, string telefone, string descricao)
    {
        Nome = nome;
        Genero = genero;
        Especialidade = especialidade;
        Crm = crm;
        Telefone = telefone;
        Descricao = descricao;
    }

    public Medico(){
        Id = proximoId++;
    }



}