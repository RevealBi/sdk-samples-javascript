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

app.MapGet("/dashboards/{name}", async (string name) =>
{
    var filePath = Path.Combine(Environment.CurrentDirectory, $"MyDashboards/{name}.rdash");
    if (!File.Exists(filePath))
        return Results.NotFound();

    var dashboard = new Dashboard(filePath);
    var btyes = await dashboard.ToByteArrayAsync();
    return Results.Bytes(btyes);
});

app.Run();
