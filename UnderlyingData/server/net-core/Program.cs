using Reveal.Sdk;
using Reveal.Sdk.Dom;
using Reveal.Sdk.Dom.Visualizations;
using RevealSdk.Server;
using Reveal.Sdk.Dom.Filters;
using System.Globalization;
using System.Text.RegularExpressions;
using Reveal.Sdk.Data.Excel;
using Reveal.Sdk.Data;
using Reveal.Sdk.Dom.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddReveal(builder =>
{
    builder.AddDataSourceProvider<RevealSdk.Server.DataSourceProvider>();
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
      builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
    );
});

var app = builder.Build();


// Enable static file serving for wwwroot
app.UseCors("AllowAll");
app.UseSwagger();
app.UseSwaggerUI();
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.MapGet("/dashboards/names", () =>
{
    try
    {
        string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "Dashboards");
        var files = Directory.GetFiles(folderPath);

        var fileNames = files.Select(file =>
        {
            try
            {
                var doc = RdashDocument.Load(file);
                return new DashboardNames(Path.GetFileNameWithoutExtension(file), doc.Title);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error Reading FileData {file}: {ex.Message}");
                return null;
            }
        }).Where(x => x != null).ToList();

        return Results.Ok(fileNames);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error Reading Directory : {ex.Message}");
        return Results.Problem("An unexpected error occurred while processing the request.");
    }
})
.Produces<IEnumerable<DashboardNames>>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.ProducesProblem(StatusCodes.Status500InternalServerError);

app.MapGet("/dashboards/{name}/visualizations/{id}/data",
                (HttpContext context, string name, string id,
                bool includeAllFields = false,
                string? filterColumn = null,
                string? filterValue = null,
                bool isDateFilter = false,
                string? formattedValue = null) =>
{
    Console.WriteLine($"Request received for dashboard: '{name}', visualization: '{id}'");
    Console.WriteLine($"Parameters: includeAllFields={includeAllFields}, filterColumn={filterColumn}, filterValue={filterValue}, isDateFilter={isDateFilter}");
    
    try 
    {
        // Handle spaces in dashboard name (if it contains spaces)
        var originalName = name;
        name = name.Replace(" ", "");
        
        var filePath = Path.Combine("dashboards", $"{name}.rdash");
        if (!File.Exists(filePath))
        {
            // Try with original name (with spaces)
            filePath = Path.Combine("dashboards", $"{originalName}.rdash");
            if (!File.Exists(filePath))
            {
                Console.WriteLine($"Dashboard not found: {filePath}");
                // Try case-insensitive search if file not found
                var directory = new DirectoryInfo(Path.Combine(Directory.GetCurrentDirectory(), "dashboards"));
                var files = directory.GetFiles("*.rdash");
                var matchingFile = files.FirstOrDefault(f => 
                    Path.GetFileNameWithoutExtension(f.Name).Equals(originalName, StringComparison.OrdinalIgnoreCase) ||
                    Path.GetFileNameWithoutExtension(f.Name).Equals(name, StringComparison.OrdinalIgnoreCase));
                
                if (matchingFile != null)
                {
                    filePath = matchingFile.FullName;
                    Console.WriteLine($"Found dashboard with different case: {filePath}");
                }
                else
                {
                    return Results.NotFound($"Dashboard '{originalName}' not found.");
                }
            }
        }

        var document = RdashDocument.Load(filePath);
        var visualization = document.Visualizations.FindById(id);
        Visualization? typedViz = null;
        
        if (visualization is Visualization viz)
        {
            typedViz = viz;
        }
        else
        {
            Console.WriteLine($"Visualization '{id}' not found. Available visualizations:");
            foreach (var v in document.Visualizations)
            {
                Console.WriteLine($"- ID: {v.Id}, Title: {v.Title}");
            }
            
            // If ID is empty or null, use the first visualization in the dashboard
            if (string.IsNullOrEmpty(id) && document.Visualizations.Count > 0)
            {
                var firstViz = document.Visualizations[0] as Visualization;
                if (firstViz != null)
                {
                    typedViz = firstViz;
                    Console.WriteLine($"Using first visualization as fallback: {typedViz.Id}");
                }
                else
                {
                    return Results.NotFound("No valid visualizations found in dashboard.");
                }
            }
            else
            {
                return Results.NotFound($"Visualization '{id}' not found or invalid.");
            }
        }

        var vizDataSourceItem = typedViz.GetDataSourceItem();
        var newDocument = new RdashDocument("underlyingdata");
        newDocument.Title = $"Underlying Data - {document.Title}";
        
        var gridFields = includeAllFields
            ? vizDataSourceItem.Fields.Select(f => f.FieldName).ToList()
            : GetFieldNames(typedViz);

        try
        {
            // Generate unique dashboard name
            var timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
            var safeName = Regex.Replace(name, @"[^a-zA-Z0-9]", "_");
            var uniqueDashboardName = $"{safeName}_{id}_underlying_{timestamp}";
            string underlyingDataPath = $"dashboards/{uniqueDashboardName}.rdash";
            
            // Handle DATE FILTER
            if (isDateFilter && !string.IsNullOrEmpty(filterValue))
            {
                if (!DateTime.TryParse(filterValue, null, DateTimeStyles.RoundtripKind, out var parsedDate))
                    return Results.BadRequest("Invalid date format.");

                var dateRange = GetDateRange(parsedDate, formattedValue ?? filterValue);
                if (dateRange == null)
                    return Results.BadRequest("Invalid date type format.");

                var dateFilter = new DashboardDateFilter
                {
                    Title = filterColumn,
                    RuleType = DateRuleType.CustomRange,
                    CustomDateRange = dateRange
                };

                var filterBinding = new DashboardDateFilterBinding(filterColumn);
                newDocument.Filters.Add(dateFilter);

                var gridViz = CreateGridViz(typedViz, vizDataSourceItem, gridFields, filterBinding, formattedValue);
                newDocument.Visualizations.Add(gridViz);
                
                // Delete existing file if present
                if (File.Exists(underlyingDataPath))
                {
                    File.Delete(underlyingDataPath);
                }
                
                newDocument.Save(underlyingDataPath);
                Console.WriteLine($"Successfully created date-filtered dashboard: {underlyingDataPath}");
                
                // Return dashboard info with unique name
                return Results.Ok(new { 
                    dashboard = newDocument, 
                    dashboardName = uniqueDashboardName,
                    filePath = underlyingDataPath 
                });
            }
            // Handle DATA FILTER
            else if (!string.IsNullOrEmpty(filterColumn) && !string.IsNullOrEmpty(filterValue))
            {
                var filterItem = new FilterItem
                {
                    FieldValues = new Dictionary<string, object> { { filterColumn, filterValue } }
                };

                var dataFilter = new DashboardDataFilter(vizDataSourceItem)
                {
                    Title = filterColumn,
                    FieldName = filterColumn,
                    AllowMultipleSelection = true,
                    AllowEmptySelection = true,
                    SelectedItems = new List<FilterItem> { filterItem }
                };

                var filterBinding = new DashboardDataFilterBinding(dataFilter);
                newDocument.Filters.Add(dataFilter);

                var gridViz = CreateGridViz(typedViz, vizDataSourceItem, gridFields, filterBinding, formattedValue);
                newDocument.Visualizations.Add(gridViz);
                
                // Delete existing file if present
                if (File.Exists(underlyingDataPath))
                {
                    File.Delete(underlyingDataPath);
                }
                
                newDocument.Save(underlyingDataPath);
                Console.WriteLine($"Successfully created filtered dashboard: {underlyingDataPath}");
                
                // Return dashboard info with unique name
                return Results.Ok(new { 
                    dashboard = newDocument, 
                    dashboardName = uniqueDashboardName,
                    filePath = underlyingDataPath 
                });
            }
            // Handle case with no specific filters - show all data
            else if (filterColumn == "AllColumns" || filterValue == "AllValues" || 
                    (string.IsNullOrEmpty(filterColumn) && string.IsNullOrEmpty(filterValue)))
            {
                Console.WriteLine("Creating dashboard with all data (no filters)");
                var gridViz = new GridVisualization(
                    typedViz.Title + " - All Data",
                    vizDataSourceItem
                ).SetColumns(gridFields.ToArray());
                
                gridViz.ConfigureSettings(x => x.PageSize = 100);
                newDocument.Visualizations.Add(gridViz);
                
                if (File.Exists(underlyingDataPath))
                {
                    File.Delete(underlyingDataPath);
                }
                
                newDocument.Save(underlyingDataPath);
                Console.WriteLine($"Successfully created unfiltered dashboard: {underlyingDataPath}");
                
                // Return dashboard info with unique name
                return Results.Ok(new { 
                    dashboard = newDocument, 
                    dashboardName = uniqueDashboardName,
                    filePath = underlyingDataPath 
                });
            }
            
            return Results.BadRequest("Insufficient or invalid parameters for filtering.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error generating underlying data dashboard: {ex.Message}");
            Console.WriteLine(ex.StackTrace);
            return Results.Problem($"Error generating underlying data: {ex.Message}");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error processing dashboard request: {ex.Message}");
        Console.WriteLine(ex.StackTrace);
        return Results.Problem($"An error occurred while processing the request: {ex.Message}");
    }
});

app.MapPost("/dashboards/duplicate/visualization", (GenerateDashboardRequest request) =>
{
    try
    {
        var dashboardDocument = new RdashDocument("Duplicated Visualization");

        var filePath = Path.Combine("dashboards", $"{request.DashboardFileName}.rdash");
        if (!File.Exists(filePath))
        {
            return Results.NotFound($"Dashboard file not found: {request.DashboardFileName}");
        }

        var sourceDoc = RdashDocument.Load(filePath);
        if (sourceDoc == null)
        {
            return Results.BadRequest($"Failed to load dashboard: {request.DashboardFileName}");
        }

        dashboardDocument.Import(sourceDoc, request.VizId);

        // Save it to disk with unique name
        var timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
        var uniqueDashboardName = $"duplicate_{request.DashboardFileName}_{request.VizId}_{timestamp}";
        var outputPath = Path.Combine("dashboards", $"{uniqueDashboardName}.rdash");
        dashboardDocument.Save(outputPath);

        // Return the dashboard document JSON (can be used by client RevealView)
        return Results.Ok(new { 
            dashboard = dashboardDocument, 
            dashboardName = uniqueDashboardName,
            filePath = outputPath 
        });
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error duplicating visualization: {ex.Message}");
        return Results.Problem("An error occurred while duplicating the visualization.");
    }
});

app.MapPost("/dashboards/analyze/visualization", (GenerateDashboardRequest request) =>
{
    try
    {
        var dashboardDocument = new RdashDocument("Visualization Analysis");

        // Step 1: Load source dashboard
        var sourcePath = Path.Combine("dashboards", $"{request.DashboardFileName}.rdash");
        if (!File.Exists(sourcePath))
            return Results.NotFound($"Dashboard file not found: {request.DashboardFileName}");

        var sourceDoc = RdashDocument.Load(sourcePath);
        if (sourceDoc == null)
            return Results.BadRequest($"Failed to load dashboard: {request.DashboardFileName}");

        // Step 2: Import selected visualization
        dashboardDocument.Import(sourceDoc, request.VizId);
        dashboardDocument.Title = "Analysis - " + sourceDoc.Title;

        // Step 3: Create a GridVisualization for underlying data
        var visualization = sourceDoc.Visualizations.FindById(request.VizId);
        if (visualization is not Visualization typedViz)
            return Results.NotFound("Visualization not found or invalid in source dashboard.");

        var vizDataSourceItem = typedViz.GetDataSourceItem();
        var gridFields = vizDataSourceItem.Fields.Select(f => f.FieldName).ToList(); // include all fields

        var gridViz = new GridVisualization(
            typedViz.Title + " - Underlying Data",
            vizDataSourceItem
        ).SetColumns(gridFields.ToArray());

        gridViz.ConfigureSettings(x => x.PageSize = 100);

        dashboardDocument.Visualizations.Add(gridViz);

        // Step 4: Save with unique name
        var timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
        var uniqueDashboardName = $"analysis_{request.DashboardFileName}_{request.VizId}_{timestamp}";
        var outputPath = Path.Combine("dashboards", $"{uniqueDashboardName}.rdash");
        
        if (File.Exists(outputPath))
        {
            File.Delete(outputPath);
        }

        // Step 5: Save
        dashboardDocument.Save(outputPath);

        return Results.Ok(new { 
            dashboard = dashboardDocument, 
            dashboardName = uniqueDashboardName,
            filePath = outputPath 
        });
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error analyzing visualization: {ex.Message}");
        return Results.Problem("An error occurred while analyzing the visualization.");
    }
});


app.Run();

static GridVisualization CreateGridViz(IVisualization viz, DataSourceItem sourceItem, IEnumerable<string> fields, dynamic filterBinding, string? formattedTitle)
{
    var gridViz = new GridVisualization(
        viz.Title + (!string.IsNullOrEmpty(formattedTitle) ? " for " + formattedTitle : ""),
        sourceItem
    ).SetColumns(fields.ToArray());
    gridViz.ConfigureSettings(x => x.PageSize = 100);
    gridViz.FilterBindings.Add(filterBinding); // works at runtime
    return gridViz;
}

static DateRange? GetDateRange(DateTime date, string formattedValue)
{
    var format = ClassifyDateFormat(formattedValue.ToLower());

    switch (format)
    {
        case "year":
            return new DateRange
            {
                From = new DateTime(date.Year, 1, 1),
                To = new DateTime(date.Year, 12, 31)
            };

        case "quarter":
            int q = (date.Month - 1) / 3;
            var quarterStart = new DateTime(date.Year, q * 3 + 1, 1);
            return new DateRange
            {
                From = quarterStart,
                To = quarterStart.AddMonths(3).AddDays(-1)
            };

        case "month":
            var monthStart = new DateTime(date.Year, date.Month, 1);
            return new DateRange
            {
                From = monthStart,
                To = monthStart.AddMonths(1).AddDays(-1)
            };

        case "day":
            return new DateRange { From = date.Date, To = date.Date };

        case "hour":
        case "minute":
            return new DateRange { From = date, To = date };

        default:
            return null;
    }
}

static string ClassifyDateFormat(string formattedValue)
{
    var patterns = new (string name, Regex pattern)[]
    {
        ("year", new(@"^\d{4}$")),
        ("quarter", new(@"^\d{4}-Q\d$|^\d{2}-Q\d$|^Q\d$")),
        ("month", new(@"^\w{3}-\d{4}$|^\w{3}-\d{2}$|^\d{2}-\d{4}$|^\d{1}-\d{2}$|^\w{3}$|^\d{2}$|^\d{1}$")),
        ("day", new(@"^\d{2}-\w{3}-\d{4}$|^\d{4}-\d{2}-\d{2}$|^\d{2}/\d{2}/\d{4}$|^\d{2}/\d{2}/\d{2}$|^\d{2}-\w{3}$|^\w{3}-\d{2}$|^\d{2}-\d{2}$")),
        ("hour", new(@"^\d{2}-\w{3}-\d{4} \d{2}:\d{2}$|^\d{2}-\w{3}-\d{2} \d{2}:\d{2}$|^\d{2}-\w{3} \d{2}:\d{2}$|^\d{2}/\d{2}/\d{4} \d{2}:\d{2}$")),
        ("minute", new(@"^\d{2}-\w{3}-\d{4} \d{2}:\d{2}$|^\d{2}-\w{3}-\d{2} \d{2}:\d{2}$|^\d{2}-\w{3} \d{2}:\d{2}$"))
    };

    foreach (var (name, regex) in patterns)
        if (regex.IsMatch(formattedValue)) return name;

    return "unknown format";
}

static List<string> GetFieldNames(IVisualization visualization)
{
    var fields = new List<string>();

    if (visualization is ILabels iLabels)
        fields.AddRange(iLabels.Labels.Select(x => x.DataField.FieldName));

    if (visualization is IRows iRows)
        fields.AddRange(iRows.Rows.Select(x => x.DataField.FieldName));

    if (visualization is ITargets iTargets)
        fields.AddRange(iTargets.Targets.Select(x => x.DataField.FieldName));

    if (visualization is IValues iValues)
        fields.AddRange(iValues.Values.Select(x => x.DataField.FieldName));

    return fields;
}

public record DashboardNames(string? DashboardFileName, string? DashboardTitle);


public class GenerateDashboardRequest
{
    public string DashboardFileName { get; set; } = default!;
    public string VizId { get; set; } = default!;
}