package com.server.reveal;

import io.revealbi.core.IRVUserContext;
import io.revealbi.core.RVUserContext;
import io.revealbi.servlet.IRVServletUserContextProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class UserContextProvider implements IRVServletUserContextProvider {

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
    public IRVUserContext getUserContext(HttpServletRequest request) {
        String userId = request.getHeader("x-header-one");
        
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