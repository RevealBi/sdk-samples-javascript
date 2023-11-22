import express, {Application} from 'express';
import reveal,
{
    IRVUserContext,
    RevealOptions,
    RVDashboardDataSource,
    RVDataSourceItem,
    RVOracleDataSourceItem,
    RVOracleServiceDataSource,
    RVUsernamePasswordDataSourceCredential
} from 'reveal-sdk-node';
import cors from "cors";

const app: Application = express();

app.use(cors());

const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVOracleServiceDataSource) {
        return new RVUsernamePasswordDataSourceCredential("username", "password");
    }
    return null;
}

const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    if (dataSourceItem instanceof RVOracleDataSourceItem) {

        //update underlying data source
        dataSourceProvider(userContext, dataSourceItem.dataSource);

        //only change the table if we have selected our data source item
        if (dataSourceItem.id === "MyOracleDataSourceItem") {
            dataSourceItem.table = "your-table";
        }
    }
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVOracleServiceDataSource) {
        dataSource.host = "your-host";
        dataSource.database = "your-database";
        dataSource.service = "your-service-name";
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