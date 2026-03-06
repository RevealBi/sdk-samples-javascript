using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.MariaDB;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
            RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVMariaDBDataSourceItem mariadbDataSourceItem)
            {
                //update underlying data source
                ChangeDataSourceAsync(userContext, mariadbDataSourceItem.DataSource);

                //only change the table if we have selected our custom data source item
                if (mariadbDataSourceItem.Id == "MyMariaDBDataSourceItem")
                {
                    mariadbDataSourceItem.Table = "orders";
                }
            }

            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
            RVDashboardDataSource dataSource)
        {
            if (dataSource is RVMariaDBDataSource mariadbDataSource)
            {
                mariadbDataSource.Host = "localhost";
                mariadbDataSource.Database = "database";
            }

            return Task.FromResult(dataSource);
        }
    }
}
