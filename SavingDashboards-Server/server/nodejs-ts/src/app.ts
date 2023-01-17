import express, { Application } from 'express';
import reveal, { IRVUserContext, RevealOptions } from 'reveal-sdk-node';
import cors from "cors";
import fs from "fs";
import { pipeline } from 'stream';
import { promisify } from 'util';

const app: Application = express();
const dashboardDirectory: string = "myDashboards";
const pipelineAsync = promisify(pipeline);

app.use(cors());

app.get("/isduplicatename/:name", (req, resp) => {
	if (fs.existsSync(`${dashboardDirectory}/${req.params.name}.rdash`)) {
		resp.send(true);
	}
	else {
		resp.send(false);
	}
});

const dashboardProvider = async (userContext:IRVUserContext | null, dashboardId: string) => {
	return fs.createReadStream(`${dashboardDirectory}/${dashboardId}.rdash`);
}

const dashboardStorageProvider = async (userContext: IRVUserContext | null, dashboardId: string, stream: fs.ReadStream) => {
	await pipelineAsync(stream, fs.createWriteStream(`${dashboardDirectory}/${dashboardId}.rdash`));
}

const options: RevealOptions = {
	dashboardProvider: dashboardProvider,
	dashboardStorageProvider: dashboardStorageProvider,
}

app.use("/", reveal(options));

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});