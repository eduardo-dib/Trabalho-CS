namespace SistemaGestaoHospitalar.Models;

using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Paciente> Pacientes { get; set; }
    public DbSet<Medico> Medicos{ get; set; }
    public DbSet<Setor> Setores {get;set;}
    public DbSet<Medicamento> Medicamentos{get;set;}
    public DbSet<Consulta> Consultas {get;set;}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Hospital.db");
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Setor>()
            .HasMany(s => s.Medicos)
            .WithOne(m => m.Setor)
            .HasForeignKey(m => m.SetorId);
    }
}