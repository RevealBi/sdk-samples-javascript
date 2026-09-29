package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVDataSourceProvider;
import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.model.RVDashboardDataSource;
import com.infragistics.reveal.sdk.api.model.RVDataSourceItem;
import com.infragistics.reveal.sdk.api.model.RVAthenaDataSource;
import com.infragistics.reveal.sdk.api.model.RVAthenaDataSourceItem;

public class DataSourceProvider implements IRVDataSourceProvider {
    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {
        //update underlying data source
        changeDataSource(userContext, dataSourceItem.getDataSource());

        if (dataSourceItem instanceof RVAthenaDataSourceItem dsi) {
            if (dsi.getId() == "my-data-source-item") {
                dsi.setTable("your_table_name");
            }            
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        if (dataSource instanceof RVAthenaDataSource ds) {
            ds.setRegion("your_region");
            ds.setDatabase("your_database_name");
        }
        return dataSource;
    }
}
