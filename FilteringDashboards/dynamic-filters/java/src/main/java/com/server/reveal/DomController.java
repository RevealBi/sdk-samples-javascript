package com.server.reveal;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.json.JSONArray;
import org.json.JSONObject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/dashboards")
public class DomController {

    @GET
    @Path("/visualizations")
    @Produces(MediaType.APPLICATION_JSON)
    public List<VisualizationChartInfo> getRdashData() {        
        String dashboardsFolderPath = "dashboards"; 
        List<VisualizationChartInfo> visualizationChartInfoList = new ArrayList<>();

        try {
            File folder = new File(dashboardsFolderPath);
            File[] rdashFiles = folder.listFiles((dir, name) -> name.endsWith(".rdash")); 
            if (rdashFiles == null || rdashFiles.length == 0) {
                System.out.println("No .rdash files found in the folder");
                return visualizationChartInfoList;
            }

            for (File rdashFile : rdashFiles) {
                String fileNameWithoutExtension = rdashFile.getName().replaceFirst("[.][^.]+$", ""); 
                String jsonContent = extractJsonFromRdash(rdashFile.getPath());
                if (jsonContent.isEmpty()) {
                    System.out.println("No JSON content found in the rdash file: " + rdashFile.getName());
                    continue;
                }

                String title = extractTitleFromJson(jsonContent);
                List<VisualizationChartInfo> widgetInfoList = parseWidgetsFromJson(jsonContent, fileNameWithoutExtension, title);
                visualizationChartInfoList.addAll(widgetInfoList);
            }

        } catch (IOException e) {
            System.err.println("Error while reading the rdash files: " + e.getMessage());
            e.printStackTrace();
        }

        return visualizationChartInfoList;
    }

    @GET
    @Path("/names")
    @Produces(MediaType.APPLICATION_JSON)
    public List<DashboardInfo> getDashboardNames() {
        String dashboardsFolderPath = "dashboards";
        List<DashboardInfo> dashboardNamesList = new ArrayList<>();

        try {
            File folder = new File(dashboardsFolderPath);
            File[] rdashFiles = folder.listFiles((dir, name) -> name.endsWith(".rdash"));
            if (rdashFiles == null || rdashFiles.length == 0) {
                System.out.println("No .rdash files found in the folder");
                return dashboardNamesList;
            }

            for (File rdashFile : rdashFiles) {
                String fileNameWithoutExtension = rdashFile.getName().replaceFirst("[.][^.]+$", "");
                String jsonContent = extractJsonFromRdash(rdashFile.getPath());
                if (jsonContent.isEmpty()) {
                    System.out.println("No JSON content found in the rdash file: " + rdashFile.getName());
                    continue;
                }

                String title = extractTitleFromJson(jsonContent);
                dashboardNamesList.add(new DashboardInfo(fileNameWithoutExtension, title));
            }

        } catch (IOException e) {
            System.err.println("Error while reading the rdash files: " + e.getMessage());
            e.printStackTrace();
        }

        return dashboardNamesList;
    }

    public String extractJsonFromRdash(String filePath) throws IOException {
        StringBuilder jsonContent = new StringBuilder();
        try (ZipFile zipFile = new ZipFile(filePath)) {
            for (ZipEntry entry : zipFile.stream().toArray(ZipEntry[]::new)) {
                if (entry.getName().endsWith(".json")) {
                    try (InputStream stream = zipFile.getInputStream(entry);
                         BufferedReader reader = new BufferedReader(new InputStreamReader(stream))) {
                        String line;
                        while ((line = reader.readLine()) != null) {
                            jsonContent.append(line);
                        }
                    }
                    break; 
                }
            }
        } catch (IOException e) {
            System.err.println("Error while extracting JSON from rdash: " + e.getMessage());
            throw e;
        }
        return jsonContent.toString();
    }

    public String extractTitleFromJson(String jsonContent) {
        JSONObject jsonObject = new JSONObject(jsonContent);
        return jsonObject.optString("Title", "Untitled"); 
    }

    public List<VisualizationChartInfo> parseWidgetsFromJson(String jsonContent, String dashboardFileName, String dashboardTitle) {
        List<VisualizationChartInfo> widgetInfoList = new ArrayList<>();
        JSONObject jsonObject = new JSONObject(jsonContent);
    
        if (!jsonObject.has("Widgets")) {
            System.out.println("No widgets found in the JSON");
            return widgetInfoList;
        }
    
        JSONArray widgets = jsonObject.getJSONArray("Widgets");
    
        for (int i = 0; i < widgets.length(); i++) {
            JSONObject widget = widgets.getJSONObject(i);

            String vizId = widget.optString("Id", "Unknown Id");
            String vizTitle = widget.optString("Title", "Untitled");    
            JSONObject visualizationSettings = widget.optJSONObject("VisualizationSettings");
            String vizChartType = "Unknown Chart Type"; 
    
            if (visualizationSettings != null) {
                String type = visualizationSettings.optString("_type");
    
                switch (type) {
                    case "IndicatorVisualizationSettingsType":
                        vizChartType = "KpiTime";
                        break;
                    case "SingleRowVisualizationSettingsType":
                        vizChartType = "TextView";
                        break;
                    case "IndicatorTargetVisualizationSettingsType":
                        vizChartType = "KpiTarget";
                        break;
                    case "DiyVisualizationSettingsType":
                        vizChartType = "Custom";
                        break;
                    case "AssetVisualizationSettingsType":
                        vizChartType = "Image";
                        break;
                    case "GridVisualizationSettingsType":
                        vizChartType = "Grid";
                        break;
                    case "GaugeVisualizationSettingsType":
                        vizChartType = "Gauge";
                        break;
                    case "TreeMapVisualizationSettingsType":
                        vizChartType = "TreeMap";
                        break;
                    case "PivotVisualizationSettingsType":
                        vizChartType = "Pivot";
                        break;                        
                    case "ChoroplethMapVisualizationSettingsType":
                        vizChartType = "Choropleth";
                    break;     
                    case "CompositeVisualizationSettingsType":
                        vizChartType = "Combo";
                        break; 
                    default:
                        vizChartType = visualizationSettings.optString("ChartType", "Unknown Chart Type");
                        break;
                }
            }
    
            String vizImageUrl = getImageUrl(vizChartType);
            widgetInfoList.add(new VisualizationChartInfo(
                    dashboardFileName, dashboardTitle, vizId, vizTitle, vizChartType, vizImageUrl
            ));
        }
        return widgetInfoList;
    }
    
    public String getImageUrl(String input) {
        String visualizationSuffix = "Visualization";
        if (input.toLowerCase().endsWith(visualizationSuffix.toLowerCase())) {
            input = input.substring(0, input.length() - visualizationSuffix.length()).trim();
        }
        String dashboardImagePath = "/images/";
        return dashboardImagePath + input + ".png";
    }

    public static class DashboardInfo {
        private String dashboardFileName;
        private String dashboardTitle;

        public DashboardInfo(String dashboardFileName, String dashboardTitle) {
            this.dashboardFileName = dashboardFileName;
            this.dashboardTitle = dashboardTitle;
        }

        public String getDashboardFileName() {
            return dashboardFileName;
        }

        public String getDashboardTitle() {
            return dashboardTitle;
        }
    }
}
