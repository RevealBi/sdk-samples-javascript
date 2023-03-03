package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVUserContext;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import com.infragistics.reveal.sdk.api.IRVDashboardProvider;

public class RevealDashboardProvider implements IRVDashboardProvider {

    @Override
    public InputStream getDashboard(IRVUserContext userContext, String dashboardId) throws IOException {
    	return getClass().getResourceAsStream("/dashboards/" + dashboardId + ".rdash");
    }

    @Override
    public void saveDashboard(IRVUserContext arg0, String arg1, InputStream arg2) throws IOException {
        
    }	
}
