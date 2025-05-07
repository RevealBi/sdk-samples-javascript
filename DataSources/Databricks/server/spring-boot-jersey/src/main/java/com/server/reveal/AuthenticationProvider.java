package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVAuthenticationProvider;
import com.infragistics.reveal.sdk.api.IRVDataSourceCredential;
import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.RVBearerTokenDataSourceCredential;
import com.infragistics.reveal.sdk.api.model.RVDashboardDataSource;
import com.infragistics.reveal.sdk.api.model.RVDatabricksDataSource;

public class AuthenticationProvider implements IRVAuthenticationProvider {
	@Override
	public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVDatabricksDataSource) {
			return new RVBearerTokenDataSourceCredential("your_personal_access_token", "your_userid");
		} 
		return null;
	}
}
