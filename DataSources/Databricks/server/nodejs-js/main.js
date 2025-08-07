var express = require('express');
var cors = require('cors');
var reveal = require('reveal-sdk-node');

const app = express();

app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.


// Step 1: User context provider
const userContextProvider = (request) => {
  console.log('All request headers:', request.headers); 
  const userId = request.headers['x-header-customerid']; 
  if (!userId) {
    console.warn('x-header-customerId is not found in headers');
  }
  var props = new Map();
  props.set("userId", userId); 
  return new reveal.RVUserContext(userId, props);
};

// Step 2: Authentication
const authenticationProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVDatabricksDataSource) {
		return new reveal.RVBearerTokenDataSourceCredential("your_personal_access_token", "your_userid");
    }
	return null;
}

// Step 3: Connect to database
const dataSourceProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVDatabricksDataSource) {
		dataSource.host = "your_server_host";
        dataSource.port = 443; // 443 is the default port
        dataSource.httpPath = "your_server_http_path";
        dataSource.database = "your_database_name";
        dataSource.schema = "your_schema_name";
	}
	return dataSource;
}

// Step 4: Create custom data items
const dataSourceItemProvider = async (userContext, dataSourceItem) => {
	if (dataSourceItem instanceof reveal.RVDatabricksDataSourceItem) {

		//update underlying data source
		dataSourceProvider(userContext, dataSourceItem.dataSource);

		//only change the table if we have selected our data source item
		if (dataSourceItem.id === "MyDatabricksDatasourceItem") {
			dataSourceItem.table = "your_table_name";
		}		
	}
	return dataSourceItem;
}

// Step 5: Load Dashboard (Optional)
const dashboardProvider = async (userContext, dashboardId) => {
  console.log(`Loading dashboard ${dashboardId}`);
  return fs.createReadStream(`${dashboardDefaultDirectory}/${dashboardId}.rdash`);
}

// Step 6: Write Dashboard (Optional)
const dashboardStorageProvider = async (userContext, dashboardId, stream) => {
  console.log(`Saving dashboard ${dashboardId}`);
  const userId = userContext.properties.get("userId");
  let savePath;

  if (userId === 'ALFKI') {
    savePath = `${dashboardDefaultDirectory}/${dashboardId}.rdash`;
    console.log(`Saving dashboard ${dashboardId} for user ${userId} to ${savePath}`);
  } else {
    savePath = `${dashboardDefaultDirectory}/${dashboardId}.rdash`;
  }

  await pipelineAsync(stream, fs.createWriteStream(savePath));
};

const revealOptions = {
userContextProvider: userContextProvider,
authenticationProvider: authenticationProvider,
dataSourceProvider: dataSourceProvider,
dataSourceItemProvider: dataSourceItemProvider,
//dashboardProvider: dashboardProvider,
//dashboardStorageProvider: dashboardStorageProvider,
}
app.use('/', reveal(revealOptions));

app.listen(5111, () => {
    console.log(`Reveal server accepting http requests`);
});
