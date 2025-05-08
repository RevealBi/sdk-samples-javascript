import express, { Application } from 'express';
import reveal, { IRVUserContext, RevealOptions, RVDashboardDataSource, RVDataSourceItem, RVAmazonWebServicesCredentials, RVAthenaDataSource } from 'reveal-sdk-node';
import cors from "cors";

const app: Application = express();

app.use(cors());

const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVAthenaDataSource) {
		return new RVAmazonWebServicesCredentials("key", "secret");
    }
	return null;
}

const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
	await dataSourceProvider(userContext, dataSourceItem.dataSource);

	if (dataSourceItem instanceof reveal.RVAthenaDataSourceItem) {
		if (dataSourceItem.id === "my-data-source-item") {
			dataSourceItem.table = "your_table_name";
		}		
	}
	return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof reveal.RVAthenaDataSource) {
		dataSource.region = "your_region";
        dataSource.database = "your_database_name";
	}
	return dataSource;
}

const revealOptions: RevealOptions = {
    authenticationProvider: authenticationProvider,
    dataSourceProvider: dataSourceProvider,
	dataSourceItemProvider: dataSourceItemProvider,
}

app.use('/', reveal(revealOptions));

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});