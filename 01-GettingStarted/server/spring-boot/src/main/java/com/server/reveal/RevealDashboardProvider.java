package com.server.reveal;

import io.revealbi.core.IRVDashboardProvider;
import io.revealbi.core.IRVUserContext;

import java.io.IOException;
import java.io.InputStream;

public class RevealDashboardProvider implements IRVDashboardProvider {

	@Override
	public InputStream getDashboard(IRVUserContext userContext, String dashboardId) throws IOException {
		InputStream dashboardStream = getClass().getResourceAsStream("/dashboards/" + dashboardId + ".rdash");

		return dashboardStream;
	}

	@Override
	public void saveDashboard(IRVUserContext arg0, String arg1, InputStream arg2) throws IOException {
	}
}
