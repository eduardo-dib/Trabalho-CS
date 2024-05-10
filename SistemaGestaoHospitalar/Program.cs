using SistemaGestaoHospitalar.Models;
using Microsoft.AspNetCore.Mvc;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");


app.MapPost("/cadastrar/paciente", ([FromBody]Paciente paciente, [FromServices] AppDbContext context) =>{
   Paciente? pacienteBuscado = context.Pacientes.FirstOrDefault(n => n.Nome == paciente.Nome);
   if(pacienteBuscado is null){
    paciente.Nome = paciente.Nome.ToUpper();
    context.Pacientes.Add(paciente);
    context.SaveChanges();
    return Results.Ok("O paciente foi cadastrado");
   }
   return Results.BadRequest("Paciente com o mesmo nome já foi criado");
});

app.MapPost("/cadastrar/medico", ([FromBody] Medico medico, [FromServices] AppDbContext context) =>{
   Medico? medicoBuscado = context.Medicos.FirstOrDefault(n => n.Nome == medico.Nome);
   if(medicoBuscado is null){
    medico.Nome = medico.Nome.ToUpper();
    context.Medicos.Add(medico);
    context.SaveChanges();
    return Results.Ok("O paciente foi cadastrado");
   }
   return Results.BadRequest("Paciente com o mesmo nome já foi criado");
});

app.MapPost("/cadastrar/setor", ([FromBody]Setor setor, [FromServices] AppDbContext context) =>{
   Setor? setorBuscado = context.Setores.FirstOrDefault(n => n.Nome == setor.Nome);
   if(setorBuscado is null){
      setor.Nome = setor.Nome.ToUpper();
      context.Setores.Add(setor);
      context.SaveChanges();
      return Results.Ok("O setor foi cadastrado");
   }
   return Results.BadRequest("Setor com o mesmo nome foi criado");

});



app.Run();

