import express, { Application } from 'express';
import reveal from 'reveal-sdk-node';
import cors from "cors";
import fs from "fs";
import path from 'path';

const app: Application = express();

app.use(cors());

app.get("/dashboards/", (req, res) => {

	fs.readdir("dashboards", (err, files) => {
		if (err) {
		  console.log('Error getting directory information');
		  res.status(500).send('Error getting directory information');
		} else {
		  const filenames = files.map((file) => {
			const extension = path.parse(file).ext;
			return file.slice(0, -extension.length);
		  });
		  res.send(filenames);
		}
	  });
});

app.use("/", reveal());

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});