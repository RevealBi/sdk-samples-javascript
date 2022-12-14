package com.server.reveal;

import java.io.IOException;
import java.io.InputStream;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.springframework.stereotype.Component;

import com.infragistics.reveal.engine.init.internal.RevealEngineLocator;
import com.infragistics.reveal.sdk.api.ExportStreamCallback;
import com.infragistics.reveal.sdk.api.IDashboardExporter;

@Component
@Path("dashboards/export/")
public class RevealExportController {

    @GET
    @Path("{name}")
    public void getDashboardExport(@Suspended final AsyncResponse response, @PathParam("name") String name, @QueryParam("format") String format) throws IOException {
        IDashboardExporter exporter = RevealEngineLocator.dashboardExporter;

        if (format.equalsIgnoreCase("xlsx")) {
            exporter.exportToExcel(name, new ExportStreamCallback() {
                @Override
                public void onFailure(Exception e) {
                    response.resume(e);
                }
    
                @Override
                public void onSuccess(InputStream stream) {
                    ResponseBuilder resp = Response.ok(stream).type("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                    response.resume(resp.build());
                } 
            });
        }
        else if (format.equalsIgnoreCase("pptx")) {
            exporter.exportToPowerPoint(name, new ExportStreamCallback() {
                @Override
                public void onFailure(Exception e) {
                    response.resume(e);
                }
    
                @Override
                public void onSuccess(InputStream stream) {
                    ResponseBuilder resp = Response.ok(stream).type("application/vnd.openxmlformats-officedocument.presentationml.presentation");
                    response.resume(resp.build());
                } 
            });            
        }
        else {
            exporter.exportToPdf(name, new ExportStreamCallback() {
                @Override
                public void onFailure(Exception e) {
                    response.resume(e);
                }
    
                @Override
                public void onSuccess(InputStream stream) {
                    ResponseBuilder resp = Response.ok(stream).type("application/pdf");
                    response.resume(resp.build());
                } 
            });
        }
    }
}
