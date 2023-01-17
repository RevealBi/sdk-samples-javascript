import express, { Application } from 'express';
import reveal, { IRVUserContext, RevealOptions } from 'reveal-sdk-node';
import cors from "cors";
import fs from "fs";
import { pipeline } from 'stream';

const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

const app: Application = express();
const dashboardDirectory: string = "myDashboards";

app.use(cors());
// app.use(express.raw());

app.get("/isduplicatename/:name", (req, resp) => {
	if (fs.existsSync(`${dashboardDirectory}/${req.params.name}.rdash`)) {
		resp.send(true);
	}
	else {
		resp.send(false);
	}
});

app.post("/dashboards/:name", async (req, resp) => {	
	const filePath: string = `${dashboardDirectory}/${req.params.name}.rdash`;	
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

const dashboardProvider = async (userContext: IRVUserContext | null, dashboardId: string) => {
	return fs.createReadStream(`${dashboardDirectory}/${dashboardId}.rdash`);
}

const options: RevealOptions = {
	dashboardProvider: dashboardProvider,
}

app.use("/", reveal(options));

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});