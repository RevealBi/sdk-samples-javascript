package com.server.reveal;

import java.io.InputStream;
import java.util.concurrent.CompletableFuture;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.revealbi.core.IDashboardExporter;
import io.revealbi.core.IRevealServer;

// Served under /dashboards (spring.mvc.servlet.path), so this maps to /dashboards/export/{name}.
@RestController
public class RevealExportController {

    private final IRevealServer revealServer;

    public RevealExportController(IRevealServer revealServer) {
        this.revealServer = revealServer;
    }

    @GetMapping("/export/{name}")
    public CompletableFuture<ResponseEntity<InputStreamResource>> getDashboardExport(@PathVariable String name, @RequestParam(defaultValue = "pdf") String format) {
        IDashboardExporter exporter = revealServer.getDashboardExporter();

        if (format.equalsIgnoreCase("xlsx")) {
            return exporter.exportToExcel(name).thenApply(stream -> file(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        }
        else if (format.equalsIgnoreCase("pptx")) {
            return exporter.exportToPowerPoint(name).thenApply(stream -> file(stream, "application/vnd.openxmlformats-officedocument.presentationml.presentation"));
        }
        else {
            return exporter.exportToPdf(name).thenApply(stream -> file(stream, "application/pdf"));
        }
    }

    private static ResponseEntity<InputStreamResource> file(InputStream stream, String contentType) {
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(new InputStreamResource(stream));
    }
}
