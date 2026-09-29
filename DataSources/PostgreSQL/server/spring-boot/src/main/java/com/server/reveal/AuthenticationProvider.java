package com.server.reveal;

import io.revealbi.core.data.IRVAuthenticationProvider;
import io.revealbi.core.data.IRVDataSourceCredential;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.RVUsernamePasswordDataSourceCredential;
import io.revealbi.core.data.RVDashboardDataSource;
import io.revealbi.core.data.RVPostgresDataSource;

public class AuthenticationProvider implements IRVAuthenticationProvider {
    @Override
    public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVPostgresDataSource) {
            return new RVUsernamePasswordDataSourceCredential("username", "password");
        }
        return null;
    }
}
