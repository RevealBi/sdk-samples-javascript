const express = require('express');
const cors = require('cors');
const reveal = require('reveal-sdk-node');

const app = express();

app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

const authenticationProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVSnowflakeDataSource) {
		return new reveal.RVUsernamePasswordDataSourceCredential("username", "password");
    }
	return null;
}

const dataSourceItemProvider = async (userContext, dataSourceItem) => {
	if (dataSourceItem instanceof reveal.RVSnowflakeDataSourceItem) {

		//update underlying data source
		dataSourceProvider(userContext, dataSourceItem.dataSource);

		//only change the table if we have selected our data source item
		if (dataSourceItem.id === "MySnowflakeDataSourceItem") {
			dataSourceItem.schema = "TPCDS_SF100TCL";
			dataSourceItem.table = "CUSTOMER";
		}		
	}
	return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVSnowflakeDataSource) {
		dataSource.account = "your-account";
		dataSource.host = "your-account-host";
		dataSource.database = "SNOWFLAKE_SAMPLE_DATA";
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