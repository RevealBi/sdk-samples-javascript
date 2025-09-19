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

app.MapGet("dashboards", async () =>
{
    try
    {
        var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards");
        var files = Directory.GetFiles(filePath, "*.rdash");

        var dashboardsWithInfo = new List<object>();

        foreach (var file in files)
        {
            var dashboardName = Path.GetFileNameWithoutExtension(file);
            try
            {
                var dashboard = new Dashboard(file);
                var info = await dashboard.GetInfoAsync(dashboardName);

                dashboardsWithInfo.Add(new
                {
                    name = info.Id,
                    title = info?.DisplayName ?? dashboardName,
                    info = info?.Info
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading dashboard {dashboardName}: {ex.Message}");
            }
        }

        return Results.Ok(dashboardsWithInfo);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in dashboards/with-info endpoint: {ex.Message}");
        return Results.Problem("Error loading dashboards");
    }
});

app.Run();
