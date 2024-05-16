using System.ComponentModel.DataAnnotations;
namespace SistemaGestaoHospitalar.Models;

public class Medicamento
{

    public string Id { get; set; }
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    public string? Nome { get; set; }
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    [Range(1, int.MaxValue, ErrorMessage = "A quantidade disponível deve ser maior ou igual a 1.")]
    public int QuantidadeDisponivel { get; set; }
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    public string Descricao { get; set; }
    public AppDbContext context { get; set; }
    public Setor Setor { get; set; }
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    public string SetorId { get; set; }

    public Medicamento(string nome, int quantidadeDisponivel, string descricao, string setorId)
    {

        Nome = nome;
        QuantidadeDisponivel = quantidadeDisponivel;
        Descricao = descricao;
        Setor = context.Setores.FirstOrDefault(s => s.Id == setorId);
    }
    public Medicamento()
    {
        Id = Guid.NewGuid().ToString();
    }
}