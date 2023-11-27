using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Microsoft.SqlServer;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVSqlServerDataSourceItem sqlDataSourceItem)
            {
                var sqlDataSource = (RVSqlServerDataSource)sqlDataSourceItem.DataSource;
                UpdateDataSource(sqlDataSource);

                if (sqlDataSourceItem.Id == "MySqlServerDataSourceItem1")
                {
                    sqlDataSourceItem.CustomQuery = "SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = 279";
                }
                
                if (sqlDataSourceItem.Id == "MySqlServerDataSourceItem2")
                {
                    sqlDataSourceItem.CustomQuery = "SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = 282";
                }
                
            }
            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            if (dataSource is RVSqlServerDataSource sqlDataSource)
                UpdateDataSource(sqlDataSource);
            
            return Task.FromResult(dataSource);
        }

        private void UpdateDataSource(RVSqlServerDataSource sqlDataSource)
        {
            sqlDataSource.Host = "your-host";
            sqlDataSource.Database = "your-database";
        }
    }
}
