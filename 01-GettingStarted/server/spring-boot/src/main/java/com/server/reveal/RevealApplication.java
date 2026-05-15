package com.server.reveal;

import io.revealbi.core.IRevealServer;
import io.revealbi.core.RVDashboardProvider;
import io.revealbi.core.RVUserContext;
import io.revealbi.core.RevealEngineConstants;
import io.revealbi.core.RevealServerBuilder;
import io.revealbi.servlet.RevealEngineServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

import java.nio.file.Path;
import java.util.Map;

@SpringBootApplication
public class RevealApplication {

	private final Environment environment;

	public RevealApplication(Environment environment) {
		this.environment = environment;
	}

	public static void main(String[] args) {
		SpringApplication.run(RevealApplication.class, args);
	}

	@Bean
	ServletRegistrationBean<RevealEngineServlet> revealServlet() {
		RevealEngineServlet revealEngineServlet = new RevealEngineServlet(
			() -> createRevealServer(),
			request -> new RVUserContext("sample-user", Map.of())
		);

		ServletRegistrationBean<RevealEngineServlet> registration =
			new ServletRegistrationBean<>(revealEngineServlet, "/*");
		registration.setAsyncSupported(true);
		registration.setLoadOnStartup(1);
		return registration;
	}

	private IRevealServer createRevealServer() {
		try {
			return new RevealServerBuilder()
				.setDashboardProvider(new RVDashboardProvider(resolveDashboardsPath()))
				.addSettings(settings -> {
					settings.setAdvancedSetting(RevealEngineConstants.LOG_DIR, Path.of(System.getProperty("java.io.tmpdir")).toString());

					String enginePath = environment.getProperty("reveal.engine.path");
					if (enginePath != null && !enginePath.isBlank()) {
						settings.setAdvancedSetting("enginePath", enginePath);
					}
				})
				.build();
		} catch (Exception e) {
			throw new IllegalStateException("Unable to create Reveal server", e);
		}
	}

	private static String resolveDashboardsPath() {
		return Path.of(System.getProperty("user.home"), "dashboards").toString();
	}
}
