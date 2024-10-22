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
	await dataSourceProvider(userContext, dataSourceItem.dataSource);	
	return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVSqlServerDataSource) {
		dataSource.host = "localhost";
		dataSource.database = "Northwind";
		dataSource.schema = "dbo";
	}
	return dataSource;
}

const dataSourceItemFilter = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    if (dataSourceItem instanceof RVSqlServerDataSourceItem) {
        const excludedList = ["Customers", "Suppliers"];  
		if (dataSourceItem.table && excludedList.includes(dataSourceItem.table)) {
			return false; // deny access
		}
    }
    return true; // Allow access
};

const revealOptions: RevealOptions = {
	authenticationProvider: authenticationProvider,
	dataSourceProvider: dataSourceProvider,
	dataSourceItemProvider: dataSourceItemProvider,
	dataSourceItemFilter: dataSourceItemFilter,
}
app.use('/', reveal(revealOptions));

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});