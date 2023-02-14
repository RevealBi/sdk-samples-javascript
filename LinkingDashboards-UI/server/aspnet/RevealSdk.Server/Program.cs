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

app.MapGet("dashboards", () =>
{
    // Get the file path for the dashboards
    var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards");

    // Get the names of all files in the directory
    var files = Directory.GetFiles(filePath);

    //return just the dashoard file names
    return files.Select(x => Path.GetFileNameWithoutExtension(x));
});

app.Run();
