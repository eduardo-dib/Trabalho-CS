using SistemaGestaoHospitalar.Models;
using Microsoft.AspNetCore.Mvc;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

List<Paciente> pacientes = new List<Paciente>();
List<Setor> setores = new List<Setor>();
List<Medico> medicos = new List<Medico>();

app.MapGet("/", () => "Hello World!");


//ENDPOINT PARA CADASTRAR PACIENTE
app.MapPost("hospital/cadastrar/paciente", ([FromBody]Paciente paciente, [FromServices] AppDbContext context) =>{
   Paciente? pacienteBuscado = context.Pacientes.FirstOrDefault(n => n.Cpf == paciente.Cpf);
    if (pacienteBuscado == null)
{

    paciente.Nome = paciente.Nome.ToUpper();
    context.Pacientes.Add(paciente);
    context.SaveChangesAsync();
    return Results.Ok("O paciente foi cadastrado");
}
return Results.BadRequest("Paciente com o mesmo CPF já foi criado");

});


//ENDPOINT PARA BUSCAR PACIENTE
app.MapGet("/hospital/buscar/paciente/{id}", ([FromRoute] string id,
    [FromServices] AppDbContext context) =>
{
    //Endpoint com várias linhas de código
    Paciente? paciente = context.Pacientes.FirstOrDefault(x => x.Id == id);

    if (paciente is null)
    {
        return Results.NotFound("Paciente não encontrado!");
    }
    return Results.Ok(paciente);
});

//ENDPOINT PARA CADASTRAR SETOR
app.MapPost("hospital/cadastrar/setor", ([FromBody]Setor setor, [FromServices] AppDbContext context) =>{
   
   Setor? setorBuscado = context.Setores.FirstOrDefault(n => n.Nome.ToUpper() == setor.Nome.ToUpper());
    if (setorBuscado == null)
 {
    setor.Nome = setor.Nome.ToUpper();
    context.Setores.Add(setor);
    context.SaveChanges();
    return Results.Ok("O setor foi cadastrado");
 }
  return Results.BadRequest("Setor com o mesmo nome já criado");
});
//ENDPOINT PARA BUSCAR SETOR
app.MapGet("/hospital/buscar/setor/{id}", ([FromRoute] string id,
    [FromServices] AppDbContext context) =>
{
    //Endpoint com várias linhas de código
    Setor? setor = context.Setores.FirstOrDefault(x => x.Id == id);

    if (setor is null)
    {
        return Results.NotFound("Setor não encontrado!");
    }
    return Results.Ok(setor);
});
//ENDPOINT PARA CADASTRAR MÉDICO
app.MapPost("hospital/cadastrar/medico", ([FromBody]Medico medico, [FromServices] AppDbContext context) =>{
   
   Medico? medicoBuscado = context.Medicos.FirstOrDefault(n => n.Nome.ToUpper() == medico.Nome.ToUpper());
    if (medicoBuscado == null)
 {
    medico.Nome = medico.Nome.ToUpper();
    context.Medicos.Add(medico);
    context.SaveChanges();
    return Results.Ok("O Médico foi cadastrado");
 }
return Results.BadRequest("Médico com o mesmo nome já cadastrado");
});
//ENDPOINT PARA BUSCAR MÉDICO
app.MapGet("/hospital/buscar/medico/{id}", ([FromRoute] string id,
    [FromServices] AppDbContext context) =>
{
    
    Medico? medico = context.Medicos.FirstOrDefault(x => x.Id == id);

    if (medico is null)
    {
        return Results.NotFound("Médico");
    }
    return Results.Ok(medico);
});



app.Run();

