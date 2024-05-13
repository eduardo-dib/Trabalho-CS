using SistemaGestaoHospitalar.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
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



//ENDPOINT PARA LISTAR PACIENTE
app.MapGet("hospital/listar/paciente", ([FromServices] AppDbContext context) =>
{
    if (context.Pacientes.Any())
    {
        return Results.Ok(context.Pacientes.ToList());
    }
    return Results.NotFound("Pacientes não encontrados!");
});

//ENDPOINT PARA DELETAR PACIENTE
app.MapDelete("/hospital/deletar/paciente/{id}", ([FromRoute] string id, [FromServices] AppDbContext context) =>
{
     Paciente? pacienteParaDeletar = context.Pacientes.FirstOrDefault(n => n.Id == id);

    if (pacienteParaDeletar is null)
    {
        return Results.NotFound("Pacientes não encontrados!");
    }
    context.Pacientes.Remove(pacienteParaDeletar);
    context.SaveChanges();
    return Results.Ok("Paciente deletado com sucesso");
});

//ENDPOINT PARA ALTERAR PACIENTE
app.MapPut("/hospital/alterar/paciente/{id}", ([FromRoute] string id, [FromBody] Paciente pacienteAlterado, [FromServices] AppDbContext context) =>
{ 
    Paciente? paciente = context.Pacientes.Find(id);

    if (paciente is null)
    {
        return Results.NotFound("Paciente não encontrado!");
    }

    paciente.Nome = pacienteAlterado.Nome;
    paciente.Cpf = pacienteAlterado.Cpf;
    paciente.Genero = pacienteAlterado.Genero;
    paciente.Telefone = pacienteAlterado.Telefone;
    paciente.Descricao = pacienteAlterado.Descricao;
    

    context.Pacientes.Update(paciente);
    context.SaveChanges();

    return Results.Ok("Paciente alterado com sucesso!");
});

//ENDPOINT PARA CADASTRAR SETOR
app.MapPost("/hospital/cadastrar/setor", ([FromBody]Setor setor, [FromServices] AppDbContext context) =>{
   
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
    
    Setor? setor = context.Setores.FirstOrDefault(x => x.Id == id);

    if (setor is null)
    {
        return Results.NotFound("Setor não encontrado!");
    }
    return Results.Ok(setor);
});

//ENDPOINT PARA LISTAR SETOR
app.MapGet("/hospital/listar/setor", ([FromServices] AppDbContext context) =>
{
    if (context.Setores.Any())
    {
        return Results.Ok(context.Setores.ToList());
    }
    return Results.NotFound("Não existem setores na tabela");
});

// ENDPOINT PARA ATUALIZAR SETOR
app.MapPut("/hospital/atualizar/setor/{id}", ([FromRoute] string id, [FromBody] Setor setorAtualizado, [FromServices] AppDbContext context) =>
{
    Setor? setorExistente = context.Setores.FirstOrDefault(n => n.Id == id);

    if (setorExistente == null)
    {
        return Results.NotFound("Setor não encontrado!");
    }

    Setor? setorDuplicado = context.Setores.FirstOrDefault(n => n.Nome.ToUpper() == setorAtualizado.Nome.ToUpper() && n.Id != id);

    if (setorDuplicado != null)
    {
        return Results.BadRequest("Já existe um setor com este nome!");
    }

    setorExistente.Nome = setorAtualizado.Nome.ToUpper();

    context.SaveChanges();
    return Results.Ok("O setor foi atualizado com sucesso!");
});

// ENDPOINT PARA DELETAR SETOR
app.MapDelete("/hospital/deletar/setor/{id}", ([FromRoute] string id, [FromServices] AppDbContext context) =>
{
    Setor? setorParaDeletar = context.Setores.FirstOrDefault(n => n.Id == id);

    if (setorParaDeletar == null)
    {
        return Results.NotFound("Setor não encontrado!");
    }

    context.Setores.Remove(setorParaDeletar);
    context.SaveChanges();

    return Results.Ok("O setor foi deletado com sucesso!");
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

//ENDPOINT PARA BUSCAR MEDICO
app.MapGet("/hospital/buscar/medico/{id}", ([FromRoute] string id,
    [FromServices] AppDbContext context) =>
{
    
    Medico? medico = context.Medicos.FirstOrDefault(x => x.Id == id);

    if (medico is null)
    {
        return Results.NotFound("Setor não encontrado!");
    }
    return Results.Ok(medico);
});

//ENDPOINT PARA LISTAR MÉDICO
app.MapGet("/hospital/listar/medico", ([FromServices] AppDbContext context) =>
{
    if (context.Medicos.Any())
    {
        return Results.Ok(context.Medicos.ToList());
    }
    return Results.NotFound("Não existem medicos na tabela");
});

// ENDPOINT PARA ATUALIZAR MÉDICO
app.MapPut("/hospital/atualizar/medico/{id}", ([FromRoute] string id, [FromBody] Medico medicoAtualizado, [FromServices] AppDbContext context) =>
{
    Medico? medicoExistente = context.Medicos.FirstOrDefault(n => n.Id == id);

    if (medicoExistente == null)
    {
        return Results.NotFound("Médico não encontrado!");
    }

    Medico? medicoDuplicado = context.Medicos.FirstOrDefault(n => n.Nome.ToUpper() == medicoAtualizado.Nome.ToUpper() && n.Id != id);

    if (medicoDuplicado != null)
    {
        return Results.BadRequest("Já existe um médico com este nome!");
    }

    medicoExistente.Nome = medicoAtualizado.Nome.ToUpper();
    medicoExistente.Genero = medicoAtualizado.Genero;
    medicoExistente.Especialidade = medicoAtualizado.Especialidade;
    medicoExistente.Crm = medicoAtualizado.Crm;
    medicoExistente.Telefone = medicoAtualizado.Telefone;
    medicoExistente.Descricao = medicoAtualizado.Descricao;

    context.SaveChanges();
    return Results.Ok("O médico foi atualizado com sucesso!");
});

// ENDPOINT PARA DELETAR MÉDICO
app.MapDelete("/hospital/deletar/medico/{id}", ([FromRoute] string id, [FromServices] AppDbContext context) =>
{
    Medico? medicoParaDeletar = context.Medicos.FirstOrDefault(n => n.Id == id);

    if (medicoParaDeletar == null)
    {
        return Results.NotFound("Médico não encontrado!");
    }

    context.Medicos.Remove(medicoParaDeletar);
    context.SaveChanges();

    return Results.Ok("O médico foi deletado com sucesso!");
});


app.Run();

