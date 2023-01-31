var express = require('express');
var cors = require('cors');
var reveal = require('reveal-sdk-node');
const { JWT } = require('google-auth-library');

const app = express();

app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

const authenticationProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVBigQueryDataSource) {
		const jwtToken = await createJwtToken();
		return new reveal.RVBearerTokenDataSourceCredential(jwtToken);
	}
	return null;
}

async function createJwtToken() {

	const credentials = require('./assets/bq-auth.json');
	const jwt = new JWT(
		credentials.client_email,
		undefined,
		credentials.private_key,
		[
			'https://www.googleapis.com/auth/bigquery',
		]
	);

	const accessToken = await jwt.getAccessToken();
	if (accessToken.token){
		return accessToken.token;
	}
	return "";
}

const revealOptions = {
    authenticationProvider: authenticationProvider,
}
app.use('/', reveal(revealOptions));

app.listen(5111, () => {
    console.log(`Reveal server accepting http requests`);
});