package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVDataSourceProvider;
import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.model.*;

import java.util.Objects;

public class DataSourceProvider implements IRVDataSourceProvider {
    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

        if (dataSourceItem instanceof RVMySqlDataSourceItem mySqlDataSourceItem) {

            //update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (Objects.equals(dataSourceItem.getId(), "MyMySqlDataSourceItem")) {
                mySqlDataSourceItem.setTable("orders");
            }
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        if (dataSource instanceof RVMySqlDataSource mySqlDataSource) {
            mySqlDataSource.setHost("localhost");
            mySqlDataSource.setDatabase("database");
        }
        return dataSource;
    }
}
