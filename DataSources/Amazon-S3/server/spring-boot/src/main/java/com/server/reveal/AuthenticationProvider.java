package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVAuthenticationProvider;
import com.infragistics.reveal.sdk.api.IRVDataSourceCredential;
import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.RVAmazonWebServicesCredentials;
import com.infragistics.reveal.sdk.api.model.RVDashboardDataSource;
import com.infragistics.reveal.sdk.api.model.RVS3DataSource;

public class AuthenticationProvider implements IRVAuthenticationProvider {
	@Override
	public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVS3DataSource) {
			return new RVAmazonWebServicesCredentials("key", "secret");
		} 
		return null;
	}
}
