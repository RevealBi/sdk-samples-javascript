using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.MongoDB;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
            RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVMongoDBDataSourceItem mongoDsi)
            {
                //update underlying data source
                ChangeDataSourceAsync(userContext, mongoDsi.DataSource);

                //only change the table if we have selected our custom data source item
                if (mongoDsi.Id == "MyMongoDBDatasourceItem")
                {
                    mongoDsi.Collection = "Orders";
                }
            }

            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
            RVDashboardDataSource dataSource)
        {
            if (dataSource is RVMongoDBDataSource mongoDataSource)
            {
                mongoDataSource.ConnectionString = "mongodb+srv://cluster0.ta2xrrt.mongodb.net/";
                mongoDataSource.Database = "test";
            }

            return Task.FromResult(dataSource);
        }
    }
}