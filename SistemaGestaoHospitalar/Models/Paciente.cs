



namespace SistemaGestaoHospitalar.Models;

public class Paciente{
    
    
    public string Id {get; set;}

    public string? Nome {get;set;}
    public string Cpf {get;set;}
    public string? Genero {get;set;}
    public string? Telefone {get;set;}
    public string? Descricao {get;set;}


       public Paciente(string nome, string cpf, string genero, string telefone, string descricao)
    {
        Nome = nome;
        Cpf = cpf;
        Genero = genero;
        Telefone = telefone;
        Descricao = descricao;
    }

    public Paciente(){
         Id = Guid.NewGuid().ToString();

    }



}