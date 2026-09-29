package com.server.reveal;

import io.revealbi.core.data.IRVAuthenticationProvider;
import io.revealbi.core.data.IRVDataSourceCredential;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.RVUsernamePasswordDataSourceCredential;
import io.revealbi.core.data.RVDashboardDataSource;
import io.revealbi.core.data.RVOracleDataSource;

public class AuthenticationProvider implements IRVAuthenticationProvider {
    @Override
    public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVOracleDataSource) {
            return new RVUsernamePasswordDataSourceCredential("username", "password");
        }
        return null;
    }
}
