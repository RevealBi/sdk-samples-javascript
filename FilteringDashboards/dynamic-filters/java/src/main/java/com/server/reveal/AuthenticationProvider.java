package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVAuthenticationProvider;
import com.infragistics.reveal.sdk.api.IRVDataSourceCredential;
import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.RVUsernamePasswordDataSourceCredential;
import com.infragistics.reveal.sdk.api.model.RVDashboardDataSource;
import com.infragistics.reveal.sdk.api.model.RVPostgresDataSource;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationProvider implements IRVAuthenticationProvider {
    
    @Override
    public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVPostgresDataSource) {
            String username = (String) userContext.getProperties().get("Username");
            String password = (String) userContext.getProperties().get("Password");
            return new RVUsernamePasswordDataSourceCredential(username, password);
        }
        return null;
    }
}
