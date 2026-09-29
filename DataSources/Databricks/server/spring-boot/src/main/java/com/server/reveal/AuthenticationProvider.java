package com.server.reveal;

import io.revealbi.core.data.IRVAuthenticationProvider;
import io.revealbi.core.data.IRVDataSourceCredential;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.RVPersonalAccessTokenDataSourceCredential;
import io.revealbi.core.data.RVDashboardDataSource;
import io.revealbi.core.data.RVDatabricksDataSource;

public class AuthenticationProvider implements IRVAuthenticationProvider {
	@Override
	public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVDatabricksDataSource) {
			return new RVPersonalAccessTokenDataSourceCredential("your_personal_access_token");
		} 
		return null;
	}
}
