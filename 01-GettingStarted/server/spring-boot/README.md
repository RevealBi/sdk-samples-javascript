# Reveal BI Spring Boot Sample

This sample uses the new Reveal BI Java SDK through the `io.revealbi:reveal-sdk-servlet` artifact. It replaces the older Jersey registration model with a Spring Boot servlet registration for `RevealEngineServlet`.

## Run

**Windows (PowerShell):**
```powershell
.\mvnw.cmd spring-boot:run
```

**macOS/Linux:**
```bash
./mvnw spring-boot:run
```

The sample listens on `http://localhost:5111` and maps Reveal at the root path so the existing Getting Started clients can connect to it without changing `RevealSdkSettings.setBaseUrl`.

Dashboards are loaded from `src/main/resources/dashboards`. Add at least one `.rdash` file there before starting the app. If the folder is empty, the client will not show any dashboards.
