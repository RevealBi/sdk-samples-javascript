package com.server.reveal;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Served under /dashboards (spring.mvc.servlet.path), so this maps to /dashboards and /dashboards/.
@RestController
public class RevealDashboardController {

    @GetMapping({"", "/"})
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
