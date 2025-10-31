package com.server.reveal;

public class VisualizationChartInfo {
    private String dashboardFileName;
    private String dashboardTitle;
    private String vizId;
    private String vizTitle;
    private String vizChartType;
    private String vizImageUrl;

    public VisualizationChartInfo(String dashboardFileName, String dashboardTitle, 
                                  String vizId, String vizTitle, 
                                  String vizChartType, String vizImageUrl) {
        this.dashboardFileName = dashboardFileName;
        this.dashboardTitle = dashboardTitle;
        this.vizId = vizId;
        this.vizTitle = vizTitle;
        this.vizChartType = vizChartType;
        this.vizImageUrl = vizImageUrl;
    }

    public String getDashboardFileName() {
        return dashboardFileName;
    }

    public void setDashboardFileName(String dashboardFileName) {
        this.dashboardFileName = dashboardFileName;
    }

    public String getDashboardTitle() {
        return dashboardTitle;
    }

    public void setDashboardTitle(String dashboardTitle) {
        this.dashboardTitle = dashboardTitle;
    }

    public String getVizId() {
        return vizId;
    }

    public void setVizId(String vizId) {
        this.vizId = vizId;
    }

    public String getVizTitle() {
        return vizTitle;
    }

    public void setVizTitle(String vizTitle) {
        this.vizTitle = vizTitle;
    }

    public String getVizChartType() {
        return vizChartType;
    }

    public void setVizChartType(String vizChartType) {
        this.vizChartType = vizChartType;
    }

    public String getVizImageUrl() {
        return vizImageUrl;
    }

    public void setVizImageUrl(String vizImageUrl) {
        this.vizImageUrl = vizImageUrl;
    }

    @Override
    public String toString() {
        return "VisualizationChartInfo [dashboardFileName=" + dashboardFileName + 
               ", dashboardTitle=" + dashboardTitle + 
               ", vizId=" + vizId + ", vizTitle=" + vizTitle + 
               ", vizChartType=" + vizChartType + ", vizImageUrl=" + vizImageUrl + "]";
    }
}
