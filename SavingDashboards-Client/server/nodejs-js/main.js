const express = require('express');
const cors = require('cors');
const reveal = require('reveal-sdk-node');
const fs = require("fs");
const { pipeline } = require("stream");
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

const app = express();
const dashboardDirectory = "myDashboards";

app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

app.get("/isduplicatename/:name", (req, resp) => {
	if (fs.existsSync(`${dashboardDirectory}/${req.params.name}.rdash`)) {
		resp.send(true);
	}
	else {
		resp.send(false);
	}
});

app.post("/dashboards/:name", async (req, resp) => {	
	const filePath = `${dashboardDirectory}/${req.params.name}.rdash`;	
	try {
		await pipelineAsync(req, fs.createWriteStream(filePath));
		resp.sendStatus(200);
	}
	catch {
		resp.sendStatus(500);
	}	
});

app.put("/dashboards/:name", async (req, resp) => {
	const filePath = `${dashboardDirectory}/${req.params.name}.rdash`;
	if (!fs.existsSync(filePath)) {
		resp.sendStatus(404);
	}

	try {
		await pipelineAsync(req, fs.createWriteStream(filePath));
		resp.sendStatus(200);
	}
	catch {
		resp.sendStatus(500);
	}	
});

const dashboardProvider = async (userContext, dashboardId) => {
	return fs.createReadStream(`${dashboardDirectory}/${dashboardId}.rdash`);
}

const options = {
	dashboardProvider: dashboardProvider,
}
app.use("/", reveal(options));

app.listen(5111, () => {
    console.log(`Reveal server accepting http requests`);
});