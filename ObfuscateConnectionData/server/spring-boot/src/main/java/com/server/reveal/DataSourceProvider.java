package com.server.reveal;

import io.revealbi.core.data.IRVDataSourceProvider;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.RVDashboardDataSource;
import io.revealbi.core.data.RVDataSourceItem;
import io.revealbi.core.data.RVSqlServerDataSource;
import io.revealbi.core.data.RVSqlServerDataSourceItem;

public class DataSourceProvider implements IRVDataSourceProvider {

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        if (dataSource instanceof RVSqlServerDataSource sqlDataSource){
            UpdateDataSource(sqlDataSource);
        }
        return dataSource;
    }

    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

        if (dataSourceItem instanceof RVSqlServerDataSourceItem sqlDataSourceItem)
        {
            var sqlDataSource = (RVSqlServerDataSource)sqlDataSourceItem.getDataSource();
            UpdateDataSource(sqlDataSource);

            sqlDataSourceItem.setDatabase("AutoPeople");
            sqlDataSourceItem.setSchema("dbo");
        }
        return dataSourceItem;
    }

    private static void UpdateDataSource(RVSqlServerDataSource sqlDataSource)
    {
        sqlDataSource.setHost("autosdbserver.database.windows.net");
        sqlDataSource.setDatabase("AutoPeople");
        sqlDataSource.setSchema("dbo");
    }
}
