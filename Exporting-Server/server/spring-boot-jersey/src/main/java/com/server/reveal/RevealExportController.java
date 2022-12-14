package com.server.reveal;

import java.io.IOException;
import java.io.InputStream;

import javax.websocket.server.PathParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.infragistics.reveal.engine.init.internal.RevealEngineLocator;
import com.infragistics.reveal.sdk.api.ExportStreamCallback;
import com.infragistics.reveal.sdk.api.IDashboardExporter;

@Component
@Path("/planets")
public class RevealExportController {

    @GET
    @Path("/dashboards/export/{name}")
    public Response getDashboardExport(@PathParam("name") String name, String format) throws IOException {
        IDashboardExporter exporter = RevealEngineLocator.dashboardExporter;

        if (format == "xlsx") {

            exporter.exportToExcel(name, new ExportStreamCallback() {

                @Override
                public void onFailure(Exception arg0) {
                    
                }

                @Override
                public void onSuccess(InputStream arg0) {
                    
                } 
            });
        }
        else if (format == "pptx") {

        }
        else {

        }

        return Response.ok(null).build();
    }

}
