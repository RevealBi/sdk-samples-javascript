package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVObjectEncoder;
import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.model.RVDashboardDataSource;
import com.infragistics.reveal.sdk.api.model.RVDataSourceItem;
import com.infragistics.reveal.sdk.api.model.RVSqlServerDataSource;
import com.infragistics.reveal.sdk.api.model.RVSqlServerDataSourceItem;

public class Encoder implements IRVObjectEncoder {

    @Override
    public RVDashboardDataSource encode(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        
        if (dataSource instanceof RVSqlServerDataSource sqlDataSource) {
            EncodeDataSource(sqlDataSource);
        }
        return dataSource;
    }

    @Override
    public RVDataSourceItem encode(IRVUserContext userContext, RVDataSourceItem dataSourceItem) {
        if (dataSourceItem instanceof RVSqlServerDataSourceItem sqlDataSourceItem)
        {
            var sqlDataSource = (RVSqlServerDataSource)sqlDataSourceItem.getDataSource();
            EncodeDataSource(sqlDataSource);

            sqlDataSourceItem.setDatabase("DB");
            sqlDataSourceItem.setSchema("SCHEMA");
        }
        return dataSourceItem;
    }

    private void EncodeDataSource(RVSqlServerDataSource sqlDataSource)
    {
        sqlDataSource.setHost("HOST");
        sqlDataSource.setDatabase("DB");
        sqlDataSource.setSchema("SCHEMA");
    }
}
