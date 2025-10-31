package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.base.RVUserContext;
import com.infragistics.reveal.sdk.rest.RVContainerRequestAwareUserContextProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import jakarta.ws.rs.container.ContainerRequestContext;

@Component
public class UserContextProvider extends RVContainerRequestAwareUserContextProvider {

    @Value("${POSTGRES_HOST}")
    private String postgresHost;

    @Value("${POSTGRES_DATABASE}")
    private String postgresDatabase;

    @Value("${POSTGRES_USERNAME}")
    private String postgresUsername;

    @Value("${POSTGRES_PASSWORD}")
    private String postgresPassword;

    @Value("${POSTGRES_SCHEMA}")
    private String postgresSchema;

    @Override
    protected IRVUserContext getUserContext(ContainerRequestContext requestContext) {
        String userId = requestContext.getHeaderString("x-header-one");
        
        if (userId != null) {
            userId = userId.trim();
        }

        // default to User role
        String role = "User";

        // null is used here just for demo 
        if ("BLONP".equals(userId) || userId == null) {
            role = "Admin";
        }

        String[] filterTables = role.equals("Admin") 
            ? new String[0] 
            : new String[]{"customers", "orders"};

        var props = new HashMap<String, Object>();
        props.put("Role", role);
        props.put("Host", postgresHost);
        props.put("Database", postgresDatabase);
        props.put("Username", postgresUsername);
        props.put("Password", postgresPassword);
        props.put("Schema", postgresSchema);
        props.put("FilterTables", filterTables);

        RVUserContext userContext = new RVUserContext(userId, props);
        return userContext; 
    }
}