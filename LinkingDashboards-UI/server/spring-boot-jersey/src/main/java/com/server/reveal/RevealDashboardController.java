package com.server.reveal;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

@Component
@Path("dashboards/")
public class RevealDashboardController {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getFileNamesWithoutExtension() {
        List<String> filenames = new ArrayList<String>();
        File directory = new File("dashboards");
        File[] files = directory.listFiles();

        for (File file : files) {
            String fileNameWithExtension = file.getName();
            String fileNameWithoutExtension = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf("."));
            filenames.add(fileNameWithoutExtension);
        }

        return filenames;
    }
}
