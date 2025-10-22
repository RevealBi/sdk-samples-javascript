package com.server.reveal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RevealApplication {

	public static void main(String[] args) {
        SpringApplication app = new SpringApplication(RevealApplication.class);
        app.setWebApplicationType(org.springframework.boot.WebApplicationType.SERVLET);
        app.run(args);
	}
}
