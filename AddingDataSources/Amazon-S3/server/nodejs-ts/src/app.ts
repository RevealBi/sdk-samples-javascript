import express, { Application } from 'express';
import reveal, { IRVUserContext, RevealOptions, RVAmazonWebServicesCredentials, RVDashboardDataSource, RVS3DataSource } from 'reveal-sdk-node';
import cors from "cors";

const app: Application = express();

app.use(cors());

const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVS3DataSource) {
		return new RVAmazonWebServicesCredentials("key", "secret");
    }
	return null;
}

const revealOptions: RevealOptions = {
    authenticationProvider: authenticationProvider,
}
app.use('/', reveal(revealOptions));

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});