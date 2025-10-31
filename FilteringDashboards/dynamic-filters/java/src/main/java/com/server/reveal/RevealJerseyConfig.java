package com.server.reveal;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.infragistics.reveal.engine.init.InitializeParameterBuilder;
import com.infragistics.reveal.engine.init.RevealEngineInitializer;

import jakarta.ws.rs.ApplicationPath;

@Component
@ApplicationPath("/")
public class RevealJerseyConfig extends ResourceConfig {
    
    public RevealJerseyConfig() {
        // Basic registration will be done here
        // Reveal initialization will be done in the configure method
    }
    
    @Autowired
    public void configureReveal(AuthenticationProvider authProvider, 
                               DataSourceProvider dsProvider,
                               DashboardProvider dashboardProvider,
                               UserContextProvider userContextProvider) {
        RevealEngineInitializer.initialize(new InitializeParameterBuilder()
            .setAuthProvider(authProvider)
            .setDataSourceProvider(dsProvider)
            .setDashboardProvider(dashboardProvider)
            //.setDashboardProvider(new RVDashboardProvider("C:\\Dev-Reveal\\Features\\DOM - Java\\java\\Dashboards"))
            .setUserContextProvider(userContextProvider)
            //.setObjectFilter(objectFilter)
            .build());

        for (Class<?> clazz : RevealEngineInitializer.getClassesToRegister()) {
            register(clazz);
        }

        register(CorsFilter.class);
        register(DomController.class);
    }
}