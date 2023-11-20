using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.PostgreSQL;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
            RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVPostgresDataSourceItem postgresDataSourceItem)
            {
                //update underlying data source
                ChangeDataSourceAsync(userContext, postgresDataSourceItem.DataSource);

                //only change the table if we have selected our custom data source item
                if (postgresDataSourceItem.Id == "MyPostgresDataSourceItem")
                {
                    postgresDataSourceItem.Table = "orders";
                }
            }

            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
            RVDashboardDataSource dataSource)
        {
            if (dataSource is RVPostgresDataSource postgresDataSource)
            {
                postgresDataSource.Host = "localhost";
                postgresDataSource.Database = "database";
                postgresDataSource.Schema = "public";
            }

            return Task.FromResult(dataSource);
        }
    }
}