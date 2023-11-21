using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.MySql;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
            RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVMySqlDataSourceItem mySqlDataSourceItem)
            {
                //update underlying data source
                ChangeDataSourceAsync(userContext, mySqlDataSourceItem.DataSource);

                //only change the table if we have selected our custom data source item
                if (mySqlDataSourceItem.Id == "MyMySqlDataSourceItem")
                {
                    mySqlDataSourceItem.Table = "orders";
                }
            }

            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
            RVDashboardDataSource dataSource)
        {
            if (dataSource is RVMySqlDataSource mySqlDataSource)
            {
                mySqlDataSource.Host = "localhost";
                mySqlDataSource.Database = "database";
            }

            return Task.FromResult(dataSource);
        }
    }
}