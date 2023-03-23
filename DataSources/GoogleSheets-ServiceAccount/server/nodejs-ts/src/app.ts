import express, { Application } from 'express';
import reveal, { IRVUserContext, RevealOptions, RVBearerTokenDataSourceCredential, RVDashboardDataSource, RVGoogleDriveDataSource } from 'reveal-sdk-node';
import cors from "cors";
import { JWT } from "google-auth-library";

const app: Application = express();

app.use(cors());

let jwtToken: string = "";
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVGoogleDriveDataSource) {
		if (jwtToken === ""){
			jwtToken = await createJwtToken();
		}
		return new RVBearerTokenDataSourceCredential(jwtToken);
	}
	return null;
}

async function createJwtToken(): Promise<string> {

	const credentials = require('../assets/auth.json');
	const jwt = new JWT(
		credentials.client_email,
		undefined,
		credentials.private_key,
		[
			"https://www.googleapis.com/auth/drive",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile"
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