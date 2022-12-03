package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVDataSourceProvider;
import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.model.RVDashboardDataSource;
import com.infragistics.reveal.sdk.api.model.RVDataSourceItem;
import com.infragistics.reveal.sdk.api.model.RVSqlServerDataSource;
import com.infragistics.reveal.sdk.api.model.RVSqlServerDataSourceItem;

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
