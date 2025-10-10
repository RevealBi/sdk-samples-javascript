# Reveal SDK - Dynamic .RDash File Generator

This .NET Core API endpoint dynamically generates `.rdash` files for visualizing underlying data based on filters and date ranges. It is designed for use with the Reveal SDK to enable custom dashboards tailored to user-selected parameters.

## Features

### 1. **Dynamic Data Filtering**
- Supports filtering based on specific columns and values.
- Handles date-based filters, automatically adjusting to different date granularities (Year, Quarter, Month, Day, etc.).

### 2. **Custom Visualization Creation**
- Generates visualizations dynamically with filtered data.
- Outputs a new `.rdash` file (`underlyingdata.rdash`) for reuse in dashboards.

### 3. **Error Handling**
- Responds with clear error messages for invalid inputs or missing resources (e.g., dashboard not found, invalid date formats).

---

## Code Breakdown

### API Route
```csharp
app.MapGet("dashboards/{name}/visualizations/{id}/data", ...);
```
Defines a `GET` endpoint to create a filtered `.rdash` file based on the provided dashboard name, visualization ID, and filtering parameters.

### Parameters
- **`name`**: Name of the dashboard file (e.g., `Marketing.rdash`).
- **`id`**: ID of the visualization within the dashboard.
- **Optional Filters**:
  - `includeAllFields`: Whether to include all fields in the filtered data.
  - `filterColumn` & `filterValue`: Specify column and value for filtering.
  - `isDateFilter`: Boolean indicating whether the filter applies to date fields.
  - `formattedValue`: Human-readable representation of the filter value.

### Key Logic

#### 1. **Dashboard and Visualization Loading**
```csharp
var document = RdashDocument.Load(filePath);
var visualization = document.Visualizations.FindById(id);
```
Loads the specified dashboard and searches for the requested visualization by ID. Returns `404` if not found.

#### 2. **Date-Based Filtering**
```csharp
var formatClassification = ClassifyDateFormat(classificationValue);
switch (formatClassification.ToLower()) {
    case "year": // Configure yearly range
    case "quarter": // Configure quarterly range
    ...
}
```
Determines the appropriate date range based on the filter value and applies it to the new dashboard.

#### 3. **Data-Based Filtering**
```csharp
var filterItem = new FilterItem {
    FieldValues = new Dictionary<string, object> {
        { filterColumn, filterValue }
    }
};
```
Configures a filter for specific columns and values.

#### 4. **Dynamic Dashboard and Visualization Creation**
```csharp
var newDocument = new RdashDocument("My Dashboard");
newDocument.Visualizations.Add(gridViz);
newDocument.Save("dashboards/underlyingdata.rdash");
```
Creates a new dashboard, adds a filtered visualization, and saves it as a `.rdash` file.

#### 5. **Error Responses**
```csharp
if (document == null) return Results.NotFound("Dashboard not found.");
if (!DateTime.TryParse(filterValue, ...)) return Results.BadRequest("Invalid date format.");
```
Handles errors gracefully with descriptive responses.

### Supporting Functions

#### **ClassifyDateFormat**
```csharp
string ClassifyDateFormat(string formattedValue)
```
Determines the format of a date string (Year, Quarter, Month, etc.) using regular expressions.

---

## Usage

### Request Example
```http
GET /dashboards/Marketing/visualizations/123/data?filterColumn=Date&filterValue=2023-01-01&isDateFilter=true
```

### Response
- **Success (`200 OK`)**: Returns the newly created `.rdash` file as a downloadable resource.
- **Error (`400/404`)**: Returns a JSON error message indicating the issue.

---

## Requirements

- **Reveal SDK**: Required for handling `.rdash` files and visualizations.
- **.NET Core**: API runs on a .NET Core server application.

---

## References

- [Reveal SDK Documentation](https://help.revealbi.io)
- [Dashboard Filters in Reveal SDK](https://help.revealbi.io/api)

---

Feel free to use this endpoint as part of your Reveal SDK-powered applications to deliver dynamic and personalized dashboards!
