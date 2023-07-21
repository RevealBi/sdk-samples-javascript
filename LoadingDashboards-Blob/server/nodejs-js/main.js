const express = require('express');
const cors = require('cors');
const reveal = require('reveal-sdk-node');
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

app.get('/dashboards/:name', async (req, res) => {
	const filePath = path.join(process.cwd(), `myDashboards/${req.params.name}.rdash`);

	if (!fs.existsSync(filePath)) {
		return res.status(404).send();
	}		

	fs.readFile(filePath, (err, data) => {
		if (err) {
			return res.status(500).send('Error reading the file');
		}

		res.setHeader('Content-Type', 'application/octet-stream');
		res.send(data);
	});
});

app.use("/", reveal());

app.listen(5111, () => {
    console.log(`Reveal server accepting http requests`);
});