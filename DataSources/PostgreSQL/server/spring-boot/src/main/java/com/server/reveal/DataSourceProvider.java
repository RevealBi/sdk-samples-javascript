package com.server.reveal;

import io.revealbi.core.data.IRVDataSourceProvider;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.*;

public class DataSourceProvider implements IRVDataSourceProvider {
    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

        if (dataSourceItem instanceof RVPostgresDataSourceItem postgresDataSourceItem) {

            //update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (dataSourceItem.getId() == "MyPostgresDataSourceItem") {
                postgresDataSourceItem.setTable("orders");
            }
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        if (dataSource instanceof RVPostgresDataSource postgresDataSource) {
            postgresDataSource.setHost("localhost");
            postgresDataSource.setDatabase("database");
            postgresDataSource.setSchema("public");
        }
        return dataSource;
    }
}
