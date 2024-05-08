namespace SistemaGestaoHospitalar.Models;

public class Paciente{
 
    private static int proximoId = 1;
    public int Id {get; set;}
    public string? Nome {get;set;}
    public string? Genero {get;set;}
    public string? Telefone {get;set;}
    public string? Descricao {get;set;}
    public int RegistroMedico { get;set;}

       public Paciente(string nome, string genero, string telefone, string descricao, int registroMedico)
    {
        Nome = nome;
        Genero = genero;
        Telefone = telefone;
        Descricao = descricao;
        RegistroMedico = registroMedico;
    }

    public Paciente(){
        Id = proximoId++;
    }



}