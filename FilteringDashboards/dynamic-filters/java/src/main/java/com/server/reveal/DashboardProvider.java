package com.server.reveal;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.IRVDashboardProvider;
import org.springframework.stereotype.Component;

@Component
public class DashboardProvider implements IRVDashboardProvider {

    @Override
    public InputStream getDashboard(IRVUserContext userContext, String dashboardId) throws IOException {
        InputStream dashboardStream = new FileInputStream("dashboards/" + dashboardId + ".rdash");
        return dashboardStream;
    }

    @Override
    public void saveDashboard(IRVUserContext userContext, String dashboardId, InputStream dashboardStream) throws IOException {
        String filePath = System.getProperty("user.dir") + "/dashboards/" + dashboardId + ".rdash";
        System.out.println("Saving file to: " + filePath);
       Files.copy(dashboardStream, Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING); 
    }	
}