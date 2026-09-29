package com.server.reveal;

import io.revealbi.core.data.IRVDataSourceProvider;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.RVDashboardDataSource;
import io.revealbi.core.data.RVDataSourceItem;
import io.revealbi.core.data.RVSqlServerDataSource;
import io.revealbi.core.data.RVSqlServerDataSourceItem;

public class DataSourceProvider implements IRVDataSourceProvider {
    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

        if (dataSourceItem instanceof RVSqlServerDataSourceItem sqlServerDsi) {
            
            //update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (dataSourceItem.getId() == "MySqlServerDatasourceItem") {
                sqlServerDsi.setTable("Orders");
            }            
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        if (dataSource instanceof RVSqlServerDataSource sqlDatasource) {
            sqlDatasource.setHost("10.0.0.20");
            sqlDatasource.setDatabase("Northwind");
            sqlDatasource.setSchema("dbo");
            sqlDatasource.setTrustServerCertificate(true); //required for debugging with self-signed certificates, should be false in production
        }
        return dataSource;
    }
}
