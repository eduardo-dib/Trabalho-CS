
using System.ComponentModel.DataAnnotations;
namespace SistemaGestaoHospitalar.Models;

public class Setor
{
    public string Id { get; set; }
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    public string? Nome { get; set; }
    public List<Medico> Medicos { get; set; }

    public Setor(string nome)
    {
        Nome = nome;

    }

    public Setor()
    {
        Medicos = new List<Medico>();
        Id = Guid.NewGuid().ToString();
    }
}