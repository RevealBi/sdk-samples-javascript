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
	await dataSourceProvider(userContext, dataSourceItem.dataSource);
	return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVSqlServerDataSource) {
		dataSource.host = "localhost";
		dataSource.database = "Northwind";
		dataSource.schema = "dbo";
	}
	return dataSource;
}

const dataSourceItemFilter = async (userContext, dataSourceItem) => {
    if (dataSourceItem instanceof reveal.RVSqlServerDataSourceItem) {
        const excludedList = ["Customers", "Suppliers"];  
		if (dataSourceItem.table && excludedList.includes(dataSourceItem.table)) {
			return false; // deny access
		}
    }
    return true; // Allow access
};

const revealOptions = {
    authenticationProvider: authenticationProvider,
    dataSourceProvider: dataSourceProvider,
	dataSourceItemProvider: dataSourceItemProvider,
	dataSourceItemFilter: dataSourceItemFilter,
}
app.use('/', reveal(revealOptions));

app.listen(5111, () => {
    console.log(`Reveal server accepting http requests`);
});