package com.server.reveal;

import java.util.Map;

import io.revealbi.core.RevealServerBuilder;
import io.revealbi.servlet.RevealEngineServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RevealApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(RevealApplication.class);
        // Reveal is mapped to /*; DomController and the chart images live under /dashboards,
        // and the longer servlet mapping wins.
        app.setDefaultProperties(Map.of("spring.mvc.servlet.path", "/dashboards"));
        app.run(args);
    }

    @Bean
    ServletRegistrationBean<RevealEngineServlet> revealServlet(AuthenticationProvider authProvider,
                                                               DataSourceProvider dsProvider,
                                                               DashboardProvider dashboardProvider,
                                                               UserContextProvider userContextProvider) {
        RevealEngineServlet revealEngineServlet = new RevealEngineServlet(
            new RevealServerBuilder()
                .setAuthenticationProvider(authProvider)
                .setDataSourceProvider(dsProvider)
                .setDashboardProvider(dashboardProvider)
                //.setObjectFilter(objectFilter)
                .build(),
            userContextProvider
        );

        ServletRegistrationBean<RevealEngineServlet> registration =
            new ServletRegistrationBean<>(revealEngineServlet, "/*");
        registration.setAsyncSupported(true);
        registration.setLoadOnStartup(1);
        return registration;
    }
}
