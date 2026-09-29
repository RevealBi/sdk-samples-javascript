package com.server.reveal;

import io.revealbi.core.data.IRVDataSourceProvider;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.*;

import java.util.Objects;

public class DataSourceProvider implements IRVDataSourceProvider {
    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

        if (dataSourceItem instanceof RVSnowflakeDataSourceItem snowflakeDataSourceItem) {

            //update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (Objects.equals(dataSourceItem.getId(), "MySnowflakeDataSourceItem")) {
                snowflakeDataSourceItem.setSchema("TPCDS_SF100TCL");
                snowflakeDataSourceItem.setTable("CUSTOMER");
            }
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        if (dataSource instanceof RVSnowflakeDataSource snowflakeDataSource) {
            snowflakeDataSource.setAccount("your-account");
            snowflakeDataSource.setHost("your-account-host");
            snowflakeDataSource.setDatabase("SNOWFLAKE_SAMPLE_DATA");
        }
        return dataSource;
    }
}
