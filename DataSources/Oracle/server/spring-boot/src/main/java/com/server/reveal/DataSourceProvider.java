package com.server.reveal;

import io.revealbi.core.data.IRVDataSourceProvider;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.*;

import java.util.Objects;

public class DataSourceProvider implements IRVDataSourceProvider {
    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

        if (dataSourceItem instanceof RVOracleDataSourceItem oracleDataSourceItem) {

            //update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (Objects.equals(dataSourceItem.getId(), "MyOracleSIDDataSourceItem")) {
                oracleDataSourceItem.setTable("your-table");
            }

            if (Objects.equals(dataSourceItem.getId(), "MyOracleServiceDataSourceItem")) {
                oracleDataSourceItem.setTable("your-table");
            }
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        //using SID
        if (dataSource instanceof RVOracleSIDDataSource oracleSIDDataSource) {
            oracleSIDDataSource.setHost("your-host");
            oracleSIDDataSource.setDatabase("your-database");
            oracleSIDDataSource.setSID("your-sid");
        }

        //using service name
        if (dataSource instanceof RVOracleServiceDataSource oracleServiceDataSource) {
            oracleServiceDataSource.setHost("your-host");
            oracleServiceDataSource.setDatabase("your-database");
            oracleServiceDataSource.setService("your-service-name");
        }

        return dataSource;
    }
}
