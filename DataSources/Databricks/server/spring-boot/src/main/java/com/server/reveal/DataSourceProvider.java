package com.server.reveal;

import io.revealbi.core.data.IRVDataSourceProvider;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.RVDashboardDataSource;
import io.revealbi.core.data.RVDataSourceItem;
import io.revealbi.core.data.RVDatabricksDataSource;
import io.revealbi.core.data.RVDatabricksDataSourceItem;

public class DataSourceProvider implements IRVDataSourceProvider {
    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

        if (dataSourceItem instanceof RVDatabricksDataSourceItem databricksDsi) {
            
            //update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (dataSourceItem.getId() == "MyDatabricksDatasourceItem") {
                databricksDsi.setTable("your_table_name");
            }            
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        if (dataSource instanceof RVDatabricksDataSource databricksDatasource) {
            databricksDatasource.setHost("your_server_host");
            databricksDatasource.setPort(443); // 443 is the default port
            databricksDatasource.setHttpPath("your_server_http_path");
            databricksDatasource.setDatabase("your_database_name");
            databricksDatasource.setSchema("your_schema_name");
        }
        return dataSource;
    }
}
