const express = require('express');
const cors = require('cors');
const reveal = require('reveal-sdk-node');
const app = express();

app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

const userContextProvider = (request) => {
    // this can be used to store values coming from the request.
    const props = new Map();

    //get the sales-person-id header set on the client
    const salesPersonId = request.headers["x-sales-person-id"];

    //add the sales-person-id property
    props.set("sales-person-id", salesPersonId);

    return new reveal.RVUserContext("user identifier", props);
};

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
        if (dataSourceItem.id === "MySqlServerDataSourceItem") {
            //get the sales-person-id from the userContext
            const salesPersonId = userContext?.properties.get("sales-person-id");

            //parametrize your custom query with the property obtained before
            dataSourceItem.customQuery = `SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = ${salesPersonId}`;
        }
    }
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVSqlServerDataSource) {
        dataSource.host = "your-host";
        dataSource.database = "your-database";
    }
    return dataSource;
}

const revealOptions = {
    userContextProvider: userContextProvider,
    authenticationProvider: authenticationProvider,
    dataSourceProvider: dataSourceProvider,
    dataSourceItemProvider: dataSourceItemProvider,
}
app.use('/', reveal(revealOptions));

app.listen(5111, () => {
    console.log(`Reveal server accepting http requests`);
});