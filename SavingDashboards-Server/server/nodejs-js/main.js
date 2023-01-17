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

const dashboardProvider = async (userContext, dashboardId) => {
	return fs.createReadStream(`${dashboardDirectory}/${dashboardId}.rdash`);
}

const dashboardStorageProvider = async (userContext, dashboardId, stream) => {
	await pipelineAsync(stream, fs.createWriteStream(`${dashboardDirectory}/${dashboardId}.rdash`));
}

const options = {
	dashboardProvider: dashboardProvider,
	dashboardStorageProvider: dashboardStorageProvider,
}
app.use("/", reveal(options));

app.listen(5111, () => {
    console.log(`Reveal server accepting http requests`);
});