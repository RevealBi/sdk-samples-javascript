package com.server.reveal;

import java.util.Arrays;
import com.infragistics.reveal.sdk.api.IRVObjectFilter;
import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.model.RVDashboardDataSource;
import com.infragistics.reveal.sdk.api.model.RVDataSourceItem;
import com.infragistics.reveal.sdk.api.model.RVPostgresDataSource;
import com.infragistics.reveal.sdk.api.model.RVPostgresDataSourceItem;
import org.springframework.stereotype.Component;

@Component
public class ObjectFilter implements IRVObjectFilter {

    @Override
    public boolean filter(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        // Not implemented - matches C# version
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    public boolean filter(IRVUserContext userContext, RVDataSourceItem dataSourceItem) {
        if (userContext != null && userContext.getProperties() != null && 
            dataSourceItem instanceof RVPostgresDataSourceItem) {

            RVPostgresDataSourceItem dataPostgresItem = (RVPostgresDataSourceItem) dataSourceItem;

            Object filterTablesObj = userContext.getProperties().get("FilterTables");
            if (filterTablesObj instanceof String[]) {
                String[] filterTables = (String[]) filterTablesObj;
                
                // If filterTables is empty, allow all
                if (filterTables.length == 0) {
                    return true;
                }
                
                // Otherwise, restrict to allowed tables/functions
                if ((dataPostgresItem.getTable() != null && !Arrays.asList(filterTables).contains(dataPostgresItem.getTable())) ||
                    (dataPostgresItem.getFunctionName() != null && !Arrays.asList(filterTables).contains(dataPostgresItem.getFunctionName()))) {
                    return false;
                }
            }
        }
        return true;
    }
    
}