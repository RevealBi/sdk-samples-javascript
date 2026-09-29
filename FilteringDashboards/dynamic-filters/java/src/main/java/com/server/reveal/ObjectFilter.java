package com.server.reveal;

import java.util.Arrays;
import io.revealbi.core.data.IRVObjectFilter;
import io.revealbi.core.IRVUserContext;
import io.revealbi.core.data.RVDataSourceItem;
import io.revealbi.core.data.RVPostgresDataSource;
import io.revealbi.core.data.RVPostgresDataSourceItem;
import org.springframework.stereotype.Component;

@Component
public class ObjectFilter implements IRVObjectFilter {

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