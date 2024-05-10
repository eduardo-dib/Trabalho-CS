
namespace SistemaGestaoHospitalar.Models;

public class Medico{
 
    private static int proximoIdMedico = 1;
    public int Id {get; set;}
    public string? Nome {get;set;}
    public string? Genero{get;set;}
    public string? Especialidade{get;set;}
    public int Crm {get;set;}
    public string? Telefone {get;set;}
    public string? Descricao{get;set;}
    public AppDbContext context{get;set;}
    public Setor Setor{get;set;}
    public int SetorId { get; set; } 

       public Medico(string nome, string genero, string especialidade, int crm, string telefone, string descricao)
{
    Nome = nome;
    Genero = genero;
    Especialidade = especialidade;
    Crm = crm;
    Telefone = telefone;
    Descricao = descricao;
    Setor = context.Setores.FirstOrDefault(s => s.Nome == "Cardiologia");
}
    public Medico(){
        Id = proximoIdMedico++;
    }



}