package com.server.reveal;

import java.util.Arrays;

import com.infragistics.reveal.sdk.api.IRVObjectFilter;
import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.model.RVDashboardDataSource;
import com.infragistics.reveal.sdk.api.model.RVDataSourceItem;
import com.infragistics.reveal.sdk.api.model.RVSqlServerDataSource;
import com.infragistics.reveal.sdk.api.model.RVSqlServerDataSourceItem;

public class RevealServerSideFilter implements IRVObjectFilter {

    @Override
    public boolean filter(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        String[] allowedList = { "Northwind" }; //here we indicate a list of databases with which we want to work

        if (dataSource != null)
        {
            if (dataSource instanceof RVSqlServerDataSource dataSQL) // we consult if it is a SQL DB and cast the generic data source to SQL to be able to access its attributes
            {
                if (Arrays.asList(allowedList).contains(dataSQL.getDatabase())) {
                    return true;
                }
            }
        }
        return false; 
    }

    @Override
    public boolean filter(IRVUserContext userContext, RVDataSourceItem dataSourceItem) {
        String[] excludedsList = { "Customers", "Suppliers" }; // here we indicate a list of tables which we want to block

        if (dataSourceItem != null)
        {
            if (dataSourceItem instanceof RVSqlServerDataSourceItem dataSQLItem) // we consult if it is a SQL DB item and cast the generic data source item to SQL item to be able to access its attributes
            {
                if (Arrays.asList(excludedsList).contains(dataSQLItem.getTable())) {
                    return false;
                }
            }
        }

        return true;
    }
    
}
