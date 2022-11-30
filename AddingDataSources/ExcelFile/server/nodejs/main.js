var express = require('express');
var cors = require('cors');
var reveal = require('reveal-sdk-node');

const app = express();

app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

const revealOptions = {
    localFileStoragePath: "data"
}
app.use('/', reveal(revealOptions));

app.listen(5111, () => {
    console.log(`Reveal server accepting http requests`);
});