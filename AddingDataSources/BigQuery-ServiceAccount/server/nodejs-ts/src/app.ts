import express, { Application } from 'express';
import reveal, { IRVUserContext, RevealOptions, RVBearerTokenDataSourceCredential, RVBigQueryDataSource, RVDashboardDataSource } from 'reveal-sdk-node';
import cors from "cors";
import { JWT } from "google-auth-library";

const app: Application = express();

app.use(cors());

const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVBigQueryDataSource) {
		const jwtToken = await createJwtToken();
		return new RVBearerTokenDataSourceCredential(jwtToken);
	}
	return null;
}

async function createJwtToken(): Promise<string> {

	const credentials = require('../assets/bq-auth.json');
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


const revealOptions: RevealOptions = {
	authenticationProvider: authenticationProvider,
}


app.use('/', reveal(revealOptions));

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});