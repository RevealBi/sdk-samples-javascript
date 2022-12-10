import express, { Application } from 'express';
import reveal, { IRVUserContext, RevealOptions } from 'reveal-sdk-node';
import cors from "cors";
const fs = require('fs');

const app: Application = express();

app.use(cors());

const dashboardProvider = async (userContext:IRVUserContext | null, dashboardId: string) => {
	return fs.createReadStream(`myDashboards/${dashboardId}.rdash`);
}

const revealOptions: RevealOptions = {
	dashboardProvider: dashboardProvider,
};
app.use("/", reveal(revealOptions));

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});