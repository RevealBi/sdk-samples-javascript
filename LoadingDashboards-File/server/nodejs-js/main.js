var express = require('express');
var cors = require('cors');
var reveal = require('reveal-sdk-node');
var fs = require('fs');

const app = express();

app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

const dashboardProvider = async (userContext, dashboardId) => {
	return fs.createReadStream(`myDashboards/${dashboardId}.rdash`);
}

const revealOptions = {
	dashboardProvider: dashboardProvider,
};
app.use('/', reveal(revealOptions));

app.listen(5111, () => {
    console.log(`Reveal server accepting http requests`);
});