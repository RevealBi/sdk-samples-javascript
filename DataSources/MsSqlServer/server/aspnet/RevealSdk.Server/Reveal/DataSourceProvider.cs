using Reveal.Sdk;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider: IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVSqlServerDataSourceItem sqlServerDsi)
            {
                //update underlying data source
                ChangeDataSourceAsync(userContext, sqlServerDsi.DataSource);

                //only change the table if we have selected our custom data source item
                if (sqlServerDsi.Id == "MySqlServerDatasourceItem")
                {
                    sqlServerDsi.Table = "Orders";
                }
            }

            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            if (dataSource is RVSqlServerDataSource sqlDatasource)
            {
                sqlDatasource.Host = "10.0.0.20";
                sqlDatasource.Database = "Northwind";
                sqlDatasource.Schema = "dbo";
            }

            return Task.FromResult(dataSource);
        }
    }
}
