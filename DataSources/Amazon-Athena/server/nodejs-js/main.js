var express = require('express');
var cors = require('cors');
var reveal = require('reveal-sdk-node');

const app = express();

app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

const authenticationProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVAthenaDataSource) {
		return new reveal.RVAmazonWebServicesCredentials("key", "secret");
    }
	return null;
}

const dataSourceItemProvider = async (userContext, dataSourceItem) => {
	await dataSourceProvider(userContext, dataSourceItem.dataSource);

	if (dataSourceItem instanceof reveal.RVAthenaDataSourceItem) {
		if (dataSourceItem.id === "my-data-source-item") {
			dataSourceItem.table = "your_table_name";
		}		
	}
	return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVAthenaDataSource) {
		dataSource.region = "your_region";
        dataSource.database = "your_database_name";
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