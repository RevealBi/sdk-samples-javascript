import express, { Application } from 'express';
import reveal,
{
	IRVUserContext,
	RevealOptions,
	RVDashboardDataSource,
	RVDataSourceItem,
	RVMySqlDataSource,
	RVMySqlDataSourceItem,
	RVSqlServerDataSource,
	RVSqlServerDataSourceItem,
	RVUserContext,
	RVUsernamePasswordDataSourceCredential
} from 'reveal-sdk-node';
import cors from "cors";
import {IncomingMessage} from "http";

const app: Application = express();

app.use(cors());

const userContextProvider = (request: IncomingMessage) => {
	// this can be used to store values coming from the request.
	const props = new Map<string, Object>();

	//get the sales-person-id header set on the client
	const salesPersonId = request.headers["x-sales-person-id"] ?? "";

	//add the sales-person-id property
	props.set("sales-person-id", salesPersonId);

	return new RVUserContext("user identifier", props);
};

const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVSqlServerDataSource) {
		return new RVUsernamePasswordDataSourceCredential("username", "password");
	}

	if (dataSource instanceof RVMySqlDataSource) {
		return new RVUsernamePasswordDataSourceCredential("username", "password");
	}

	return null;
}

const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
	if (dataSourceItem instanceof RVSqlServerDataSourceItem) {
		//update underlying data source
		dataSourceProvider(userContext, dataSourceItem.dataSource);

		//only change the table if we have selected our data source item
		if (dataSourceItem.id === "MySqlServerDataSourceItem") {
			//get the sales-person-id from the userContext
			const salesPersonId = userContext?.properties.get("sales-person-id");

			//parametrize your custom query with the property obtained before
			dataSourceItem.customQuery = `SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = ${salesPersonId}`;
		}
	}

	if (dataSourceItem instanceof RVMySqlDataSourceItem) {
		//update underlying data source
		dataSourceProvider(userContext, dataSourceItem.dataSource);

		//only change the table if we have selected our data source item
		if (dataSourceItem.id === "MyMySqlDataSourceItem") {
			//get the sales-person-id from the userContext
			const salesPersonId = userContext?.properties.get("sales-person-id");

			//parametrize your custom query with the property obtained before
			dataSourceItem.customQuery = `SELECT * FROM Sales_SalesOrderHeader WHERE SalesPersonId = ${salesPersonId}`;
		}
	}

	return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVSqlServerDataSource) {
		dataSource.host = "your-host";
		dataSource.database = "your-database";
	}

	if (dataSource instanceof RVMySqlDataSource) {
		dataSource.host = "your-host";
		dataSource.database = "your-database";
	}

	return dataSource;
}

const revealOptions: RevealOptions = {
	userContextProvider: userContextProvider,
	authenticationProvider: authenticationProvider,
	dataSourceProvider: dataSourceProvider,
	dataSourceItemProvider: dataSourceItemProvider,
}
app.use('/', reveal(revealOptions));

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});