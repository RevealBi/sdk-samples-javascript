package com.server.reveal;

import io.revealbi.core.RevealServerBuilder;
import io.revealbi.servlet.RevealEngineServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RevealApplication {

	public static void main(String[] args) {
		SpringApplication.run(RevealApplication.class, args);
	}

	@Bean
	ServletRegistrationBean<RevealEngineServlet> revealServlet() {
		RevealEngineServlet revealEngineServlet = new RevealEngineServlet(
			new RevealServerBuilder()
				.setDashboardProvider(new RevealDashboardProvider())
				.build()
		);

		ServletRegistrationBean<RevealEngineServlet> registration =
			new ServletRegistrationBean<>(revealEngineServlet, "/*");
		registration.setAsyncSupported(true);
		registration.setLoadOnStartup(1);
		return registration;
	}
}
