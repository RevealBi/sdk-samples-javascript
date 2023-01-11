using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
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

app.MapGet("/dashboards/export/{name}", async (string name, string format, IDashboardExporter dashboardExporter) =>
{
    Stream stream;
    string contentType = "application/pdf";
    if (format=="xlsx")
    {
        stream = await dashboardExporter.ExportToExcel(name, options: new ExcelExportOptions()
        {
            VisualizationMode = ExcelVisualizationMode.Include
        });
        contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
    else if (format == "pptx")
    {
        stream = await dashboardExporter.ExportToPowerPoint(name);
        contentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    }
    else
    {
        stream = await dashboardExporter.ExportToPdf(name);
    }
    
    return Results.File(stream, contentType);
});

app.MapGet("/dashboards/export2/{name}", async (string name, string format, IDashboardExporter dashboardExporter) =>
{
    string contentType = "application/pdf";
    ExportFormat exportFormat = ExportFormat.Pdf;

    IExportOptions options = new DocumentExportOptions()
    {
        Author = "Brian Lagunas",
        Company = "Infragistics",
        IsLandscape= true,
    };

    if (format == "xlsx")
    {
        exportFormat = ExportFormat.Excel;
        contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        options = new ExcelExportOptions(options)
        {
            VisualizationMode = ExcelVisualizationMode.Include,
        };
    }
    else if (format == "pptx")
    {
        exportFormat = ExportFormat.PowerPoint;
        contentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";   
    }

    var stream = await dashboardExporter.Export(exportFormat, name, options: options);

    return Results.File(stream, contentType);
});

app.Run();
