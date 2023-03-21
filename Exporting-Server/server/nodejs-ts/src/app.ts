import express, { Application } from 'express';
import reveal from 'reveal-sdk-node';
import cors from "cors";
import { ReadStream } from 'fs';

const app: Application = express();
const revealServer = reveal();

app.use(cors());

app.get("/dashboards/export/:name", async (req, resp) => {
	const name = req.params.name;
	const format = req.query.format;
	let stream: ReadStream | void;
	let contentType = "application/pdf";

	if (format === "xlsx"){
		contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";	
		stream = await revealServer.exporter.exportExcel(name, null, null, null);
	}
	else if (format === "pptx") {
		contentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
		stream = await revealServer.exporter.exportPowerPoint(name, null, null, null);
	}
	else {
		stream = await revealServer.exporter.exportPdf(name, null, null, null);
	}

	if (stream) {
		resp.setHeader("Content-Type", contentType);
		stream.pipe(resp);
	}
	else {
		resp.send(404);
	}
});

app.use("/", revealServer);

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});