package com.server.reveal;

import io.revealbi.core.data.IRVAuthenticationProvider;
import io.revealbi.core.data.IRVDataSourceCredential;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.RVAmazonWebServicesCredentials;
import io.revealbi.core.data.RVDashboardDataSource;
import io.revealbi.core.data.RVAthenaDataSource;

public class AuthenticationProvider implements IRVAuthenticationProvider {
	@Override
	public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVAthenaDataSource) {
			return new RVAmazonWebServicesCredentials("key", "secret");
		} 
		return null;
	}
}
