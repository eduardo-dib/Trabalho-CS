namespace SistemaGestaoHospitalar.Models;

using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Paciente> Pacientes { get; set; }
    public DbSet<Medico> Medicos{ get; set; }
    public DbSet<Setor> Setores {get;set;}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Hospital.db");
    }
}