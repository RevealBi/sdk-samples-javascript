import express, { Application } from 'express';
import reveal, { IRVUserContext, RevealOptions, RVDashboardDataSource, RVSqlServerDataSource, RVUserNamePasswordDataSourceCredential } from 'reveal-sdk-node';
import cors from "cors";

const app: Application = express();

app.use(cors());

const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVSqlServerDataSource) {
		return new RVUserNamePasswordDataSourceCredential("username", "password");
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