# Reveal BI Spring Boot Sample

This sample uses the new Reveal BI Java SDK through the `io.revealbi:reveal-sdk-servlet` artifact. It replaces the older Jersey registration model with a Spring Boot servlet registration for `RevealEngineServlet`.

## Run

**Windows (PowerShell):**
```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.arguments=--server.port=5111"
```

**macOS/Linux:**
```bash
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=5111
```

The sample listens on `http://localhost:5111` and maps Reveal at the root path so the existing Getting Started clients can connect to it without changing `RevealSdkSettings.setBaseUrl`.

Dashboards are loaded from the `Dashboards` folder in the server project.
