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
            //update underlying data source
            ChangeDataSourceAsync(userContext, dataSourceItem.DataSource);

            if (dataSourceItem is RVSqlServerDataSourceItem sqlDataSourceItem)
            {
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
            {
                sqlDataSource.Host = "your-host";
                sqlDataSource.Database = "your-database";
            }

            if (dataSource is RVMySqlDataSource mySqlDataSource)
            {
                mySqlDataSource.Host = "your-host";
                mySqlDataSource.Database = "your-database";
            }

            return Task.FromResult(dataSource);
        }
    }
}