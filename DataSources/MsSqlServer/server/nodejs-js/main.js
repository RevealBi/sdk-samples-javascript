var express = require('express');
var cors = require('cors');
var reveal = require('reveal-sdk-node');

const app = express();

app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

const authenticationProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVSqlServerDataSource) {
		return new reveal.RVUsernamePasswordDataSourceCredential("username", "password");
    }
	return null;
}

const dataSourceItemProvider = async (userContext, dataSourceItem) => {
	if (dataSourceItem instanceof reveal.RVSqlServerDataSourceItem) {

		//update underlying data source
		dataSourceProvider(userContext, dataSourceItem.dataSource);

		//only change the table if we have selected our data source item
		if (dataSourceItem.id === "MySqlServerDatasourceItem") {
			dataSourceItem.table = "Orders";
		}		
	}
	return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVSqlServerDataSource) {
		dataSource.host = "10.0.0.20";
		dataSource.database = "Northwind";
		dataSource.schema = "dbo";
	}
	return dataSource;
}

const revealOptions = {
    authenticationProvider: authenticationProvider,
    dataSourceProvider: dataSourceProvider,
	dataSourceItemProvider: dataSourceItemProvider,
}
app.use('/', reveal(revealOptions));

app.listen(5111, () => {
    console.log(`Reveal server accepting http requests`);
});