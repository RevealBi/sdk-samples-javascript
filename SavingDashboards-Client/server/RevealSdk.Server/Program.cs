using Reveal.Sdk;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddReveal();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAll",
    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
  );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
  app.UseCors("AllowAll");
}

app.UseAuthorization();

app.MapControllers();

app.Map("/isduplicatename/{name}", (string name) =>
{
    var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards");
    return File.Exists($"{filePath}/{name}.rdash");
});

app.MapPost("/dashboards/{name}", async (HttpRequest request, string name) =>
{
    var ms = new MemoryStream();
    await request.Body.CopyToAsync(ms);
    var bytes = ms.ToArray();

    var filePath = Path.Combine(Environment.CurrentDirectory, $"Dashboards/{name}.rdash");
    using (var stream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
    {
        await stream.WriteAsync(bytes, 0, bytes.Length);
    }
});

app.MapPut("/dashboards/{name}", async (HttpRequest request, string name) =>
{
    var filePath = Path.Combine(Environment.CurrentDirectory, $"Dashboards/{name}.rdash");
    if (!File.Exists(filePath))
        return;

    byte[] bytes;
    using (var ms = new MemoryStream())
    {
        await request.Body.CopyToAsync(ms);
        bytes = ms.ToArray();
    }

    using (var stream = File.Open(filePath, FileMode.Open))
    {
        stream.Write(bytes, 0, bytes.Length);
    }
});

app.Run();
