using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Microsoft.SqlServer;
using Reveal.Sdk.Data.MySql;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
            RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVSqlServerDataSourceItem sqlDataSourceItem)
            {
                var sqlDataSource = (RVSqlServerDataSource)sqlDataSourceItem.DataSource;
                UpdateDataSource(sqlDataSource);

                if (sqlDataSourceItem.Id == "MySqlServerDataSourceItem")
                {
                    //get the sales-person-id from the userContext
                    var salesPersonId = userContext.Properties["sales-person-id"];

                    //parametrize your custom query with the property obtained before
                    sqlDataSourceItem.CustomQuery =
                        $"SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = {salesPersonId}";
                }
            }

            if (dataSourceItem is RVMySqlDataSourceItem mySqlDataSourceItem)
            {
                var sqlDataSource = (RVMySqlDataSource)mySqlDataSourceItem.DataSource;
                UpdateDataSource(sqlDataSource);

                if (mySqlDataSourceItem.Id == "MyMySqlDataSourceItem")
                {
                    //get the sales-person-id from the userContext
                    var salesPersonId = userContext.Properties["sales-person-id"];

                    //parametrize your custom query with the property obtained before
                    mySqlDataSourceItem.CustomQuery =
                        $"SELECT * FROM Sales_SalesOrderHeader WHERE SalesPersonId = {salesPersonId}";
                }
            }

            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
            RVDashboardDataSource dataSource)
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

        private void UpdateDataSource(RVMySqlDataSource mySqlDataSource)
        {
            mySqlDataSource.Host = "your-host";
            mySqlDataSource.Database = "your-database";
        }
    }
}