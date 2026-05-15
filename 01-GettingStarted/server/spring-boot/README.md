# Reveal BI Spring Boot Sample

This sample uses the new Reveal BI Java SDK through the `io.revealbi:reveal-sdk-servlet` artifact. It replaces the older Jersey registration model with a Spring Boot servlet registration for `RevealEngineServlet`.

## Run

```powershell
.\mvnw.cmd spring-boot:run
```

The sample listens on `http://localhost:5111` and maps Reveal at the root path so the existing Getting Started clients can connect to it without changing `RevealSdkSettings.setBaseUrl`.

Dashboards are loaded from `%USERPROFILE%\dashboards` on Windows and `~/dashboards` on macOS/Linux by default. Before starting the app, create that folder if it does not exist and copy at least one `.rdash` file into it (for example `LoadingDashboards-File/server/spring-boot-jersey/dashboards/Sales.rdash` from this repository). If the folder is empty, the client will not show any dashboards.

To use a local engine build instead of the native engine bundled with the SDK, set `REVEAL_ENGINE_PATH` before starting the app.
