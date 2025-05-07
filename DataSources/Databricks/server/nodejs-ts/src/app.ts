import express, {Application} from 'express';
import reveal,
{
    IRVUserContext,
    RevealOptions,
    RVDashboardDataSource,
    RVDataSourceItem,
    RVDatabricksDataSource,
    RVDatabricksDataSourceItem,
    RVBearerTokenDataSourceCredential
} from 'reveal-sdk-node';
import cors from "cors";

const app: Application = express();

app.use(cors());

const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVDatabricksDataSource) {
        return new RVBearerTokenDataSourceCredential("your_personal_access_token", "your_userid");
    }
    return null;
}

const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    if (dataSourceItem instanceof RVDatabricksDataSourceItem) {

        //update underlying data source
        dataSourceProvider(userContext, dataSourceItem.dataSource);

        //only change the table if we have selected our data source item
        if (dataSourceItem.id === "MyDatabricksDatasourceItem") {
            dataSourceItem.table = "your_table_name";
        }
    }
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVDatabricksDataSource) {
        dataSource.host = "your_server_host";
        dataSource.port = 443; // 443 is the default port
        dataSource.httpPath = "your_server_http_path";
        dataSource.database = "your_database_name";
        dataSource.schema = "your_schema_name";
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