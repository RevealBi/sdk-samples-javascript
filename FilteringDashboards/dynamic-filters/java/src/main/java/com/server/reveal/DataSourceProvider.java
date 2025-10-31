package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVDataSourceProvider;
import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.model.*;
import org.springframework.stereotype.Component;
import java.util.HashMap;

@Component
public class DataSourceProvider implements IRVDataSourceProvider {
    
    
    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {
        // ****
        // Every request for data passes thru changeDataSourceItem
        // You can set query properties based on the incoming requests
        // for example, you can check:
        // - dsi.getId()
        // - dsi.getTable()
        // - dsi.getProcedure()
        // - dsi.getTitle()
        // and take a specific action on the dsi as this request is processed
        // ****
        
        if (!(dataSourceItem instanceof RVPostgresDataSourceItem)) {
            return dataSourceItem;
        }

        RVPostgresDataSourceItem postgresDsi = (RVPostgresDataSourceItem) dataSourceItem;

        // Ensure data source is updated
        changeDataSource(userContext, dataSourceItem.getDataSource());

        // Execute query based on the incoming client request
        switch (postgresDsi.getId()) {
            case "CustOrdersOrders":
                // **************************************
                System.out.println((String) "Function Called - " + postgresDsi.getId());
                System.out.println((String) "Parameter Passed - " + userContext.getUserId());
                // **************************************

                // Set the function name and parameters
                postgresDsi.setFunctionName(postgresDsi.getId());
                HashMap<String, Object> functionParameters = new HashMap<>();
                functionParameters.put("customer_id", userContext.getUserId());
                postgresDsi.setFunctionParameters(functionParameters);
                break;
            default:
                // Check for general table access logic
                return null;
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVPostgresDataSource) {
            RVPostgresDataSource postgresDataSource = (RVPostgresDataSource) dataSource;
            System.out.println((String) userContext.getProperties().get("Host"));
            postgresDataSource.setHost((String) userContext.getProperties().get("Host"));
            postgresDataSource.setDatabase((String) userContext.getProperties().get("Database"));
        }
        return dataSource;
    }
}