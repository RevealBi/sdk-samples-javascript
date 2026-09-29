package com.server.reveal;

import io.revealbi.core.data.IRVDataSourceProvider;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.RVDashboardDataSource;
import io.revealbi.core.data.RVDataSourceItem;
import io.revealbi.core.data.RVAthenaDataSource;
import io.revealbi.core.data.RVAthenaDataSourceItem;

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
