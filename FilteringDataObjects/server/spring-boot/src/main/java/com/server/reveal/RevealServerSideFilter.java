package com.server.reveal;

import java.util.Arrays;

import io.revealbi.core.data.IRVObjectFilter;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.RVDashboardDataSource;
import io.revealbi.core.data.RVDataSourceItem;
import io.revealbi.core.data.RVSqlServerDataSource;
import io.revealbi.core.data.RVSqlServerDataSourceItem;

public class RevealServerSideFilter implements IRVObjectFilter {

    // IRVObjectFilter only filters data source items in 2.x, so the data source check runs for each item.
    private boolean isAllowedDataSource(RVDashboardDataSource dataSource) {
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
            if (!isAllowedDataSource(dataSourceItem.getDataSource())) {
                return false;
            }

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
