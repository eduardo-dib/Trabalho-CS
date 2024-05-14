
namespace SistemaGestaoHospitalar.Models;

public class Medicamento{
 
    public string Id {get; set;}
    public string? Nome {get;set;}
    public int QuantidadeDisponivel {get; set;}
    public string Descricao {get; set;}
    public AppDbContext context{get;set;}
    public Setor Setor{get;set;}
    public string SetorId {get;set;} 

    public Medicamento(string nome, int quantidadeDisponivel, string descricao, string setorId){

    Nome = nome;
    QuantidadeDisponivel = quantidadeDisponivel;
    Descricao = descricao;
    Setor = context.Setores.FirstOrDefault(s => s.Id == setorId);
}
    public Medicamento(){
        Id = Guid.NewGuid().ToString();
    }
}