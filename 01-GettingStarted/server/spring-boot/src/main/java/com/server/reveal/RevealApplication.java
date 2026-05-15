package com.server.reveal;

import io.revealbi.core.RevealServerBuilder;
import io.revealbi.core.RVDashboardProvider;
import io.revealbi.servlet.RevealEngineServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import java.nio.file.Paths;

@SpringBootApplication
public class RevealApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(RevealApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(RevealApplication.class);
	}

	@Bean
	ServletRegistrationBean<RevealEngineServlet> revealServlet() {
		RevealEngineServlet revealEngineServlet = new RevealEngineServlet(
			new RevealServerBuilder()
				.setDashboardProvider(new RVDashboardProvider(Paths.get("Dashboards").toAbsolutePath().toString()))
				.build()
		);

		ServletRegistrationBean<RevealEngineServlet> registration =
			new ServletRegistrationBean<>(revealEngineServlet, "/*");
		registration.setAsyncSupported(true);
		registration.setLoadOnStartup(1);
		return registration;
	}
}
