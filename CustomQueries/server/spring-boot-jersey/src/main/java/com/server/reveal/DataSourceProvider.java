package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVDataSourceProvider;
import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.model.*;

import java.util.Objects;

public class DataSourceProvider implements IRVDataSourceProvider {
    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

        if (dataSourceItem instanceof RVSqlServerDataSourceItem sqlDataSourceItem) {
            //update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (Objects.equals(dataSourceItem.getId(), "MySqlServerDataSourceItem")) {
                //get the sales-person-id from the userContext
                var salesPersonId = userContext.getProperties().get("sales-person-id");

                //parametrize your custom query with the property obtained before
                sqlDataSourceItem.setCustomQuery(String.format("SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = %s", salesPersonId));
            }
        }

        if (dataSourceItem instanceof RVMySqlDataSourceItem mySqlDataSourceItem) {
            //update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (Objects.equals(dataSourceItem.getId(), "MyMySqlDataSourceItem")) {
                //get the sales-person-id from the userContext
                var salesPersonId = userContext.getProperties().get("sales-person-id");

                //parametrize your custom query with the property obtained before
                //when using a MySqlDataSourceItem, you should use the fully qualified name for tables, otherwise it won't work
                mySqlDataSourceItem.setCustomQuery(String.format("SELECT * FROM AdventureWorks.Sales_SalesOrderHeader WHERE SalesPersonID = %s", salesPersonId));
            }
        }

        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVSqlServerDataSource sqlDatasource) {
            sqlDatasource.setHost("your-host");
            sqlDatasource.setDatabase("your-database");
        }

        if (dataSource instanceof RVMySqlDataSource mySqlDataSource) {
            mySqlDataSource.setHost("your-host");
            mySqlDataSource.setDatabase("your-database");
        }

        return dataSource;
    }
}
