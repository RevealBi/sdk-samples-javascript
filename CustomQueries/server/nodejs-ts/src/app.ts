import express, { Application } from 'express';
import reveal,
{
	IRVUserContext,
	RevealOptions,
	RVDashboardDataSource,
	RVDataSourceItem,
	RVSqlServerDataSource,
	RVSqlServerDataSourceItem,
	RVUsernamePasswordDataSourceCredential
} from 'reveal-sdk-node';
import cors from "cors";

const app: Application = express();

app.use(cors());

const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVSqlServerDataSource) {
		return new RVUsernamePasswordDataSourceCredential("username", "password");
	}
	return null;
}

const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
	if (dataSourceItem instanceof RVSqlServerDataSourceItem) {

		//update underlying data source
		dataSourceProvider(userContext, dataSourceItem.dataSource);

		//only change the table if we have selected our data source item
		if (dataSourceItem.id === "MySqlServerDataSourceItem1") {
			dataSourceItem.customQuery = "SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = 279";
		}

		if (dataSourceItem.id === "MySqlServerDataSourceItem2") {
			dataSourceItem.customQuery = "SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = 282";
		}
	}
	return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVSqlServerDataSource) {
		dataSource.host = "your-host";
		dataSource.database = "your-database";
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