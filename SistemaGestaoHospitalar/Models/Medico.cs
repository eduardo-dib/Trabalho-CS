using System.ComponentModel.DataAnnotations;
namespace SistemaGestaoHospitalar.Models;

public class Medico{
 
    public string Id {get; set;}
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    public string? Nome {get;set;}
    public string? Genero{get;set;}
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    public string? Especialidade{get;set;}
    [RegularExpression(@"^\d{6}$", ErrorMessage = "O CRM deve ter 6 dígitos.")]
    public int Crm {get;set;}
    public string? Telefone {get;set;}
    public string? Descricao{get;set;}
    public AppDbContext context{get;set;}
    public Setor Setor{get;set;}
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    public string SetorId { get; set; } 

       public Medico(string nome, string genero, string especialidade, int crm, string telefone, string descricao, string setorId)
{
    Nome = nome;
    Genero = genero;
    Especialidade = especialidade;
    Crm = crm;
    Telefone = telefone;
    Descricao = descricao;
    Setor = context.Setores.FirstOrDefault(s => s.Id == setorId);
}
    public Medico(){
        Id = Guid.NewGuid().ToString();
    }



}