﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SistemaGestaoHospitalar.Models;

#nullable disable

namespace SistemaGestaoHospitalar.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240515152200_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.4");

            modelBuilder.Entity("SistemaGestaoHospitalar.Models.Consulta", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("DataHoraConsulta")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("MedicoId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("MedicoNome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Observacoes")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PacienteId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PacienteNome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("MedicoId");

                    b.HasIndex("PacienteId");

                    b.ToTable("Consultas");
                });

            modelBuilder.Entity("SistemaGestaoHospitalar.Models.Medicamento", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.Property<int>("QuantidadeDisponivel")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SetorId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("SetorId");

                    b.ToTable("Medicamentos");
                });

            modelBuilder.Entity("SistemaGestaoHospitalar.Models.Medico", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("Crm")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Descricao")
                        .HasColumnType("TEXT");

                    b.Property<string>("Especialidade")
                        .HasColumnType("TEXT");

                    b.Property<string>("Genero")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.Property<string>("SetorId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Telefone")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("SetorId");

                    b.ToTable("Medicos");
                });

            modelBuilder.Entity("SistemaGestaoHospitalar.Models.Paciente", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("Cpf")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Descricao")
                        .HasColumnType("TEXT");

                    b.Property<string>("Genero")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.Property<string>("Telefone")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Pacientes");
                });

            modelBuilder.Entity("SistemaGestaoHospitalar.Models.Setor", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Setores");
                });

            modelBuilder.Entity("SistemaGestaoHospitalar.Models.Consulta", b =>
                {
                    b.HasOne("SistemaGestaoHospitalar.Models.Medico", "Medico")
                        .WithMany()
                        .HasForeignKey("MedicoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SistemaGestaoHospitalar.Models.Paciente", "Paciente")
                        .WithMany()
                        .HasForeignKey("PacienteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Medico");

                    b.Navigation("Paciente");
                });

            modelBuilder.Entity("SistemaGestaoHospitalar.Models.Medicamento", b =>
                {
                    b.HasOne("SistemaGestaoHospitalar.Models.Setor", "Setor")
                        .WithMany()
                        .HasForeignKey("SetorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Setor");
                });

            modelBuilder.Entity("SistemaGestaoHospitalar.Models.Medico", b =>
                {
                    b.HasOne("SistemaGestaoHospitalar.Models.Setor", "Setor")
                        .WithMany("Medicos")
                        .HasForeignKey("SetorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Setor");
                });

            modelBuilder.Entity("SistemaGestaoHospitalar.Models.Setor", b =>
                {
                    b.Navigation("Medicos");
                });
#pragma warning restore 612, 618
        }
    }
}
