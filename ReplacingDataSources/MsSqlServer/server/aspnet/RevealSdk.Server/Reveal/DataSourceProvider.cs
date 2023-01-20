using Reveal.Sdk;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider: IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVSqlServerDataSourceItem sqlServerDsi)
            {
                // Optionally change SQL Server host here too - overrides the values set in ChangeDataSourceAsync
                var sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.DataSource;
                sqlServerDS.Host = "10.0.0.50";

                // Change SQL Server database and table/view
                sqlServerDsi.Database = "Adventure Works 2";
                sqlServerDsi.Table = "Employees";
            }

            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            if (dataSource is RVSqlServerDataSource sqlDatasource)
            {
                // Change SQL Server host and database
                sqlDatasource.Host = "10.0.0.20";
                sqlDatasource.Database = "Adventure Works";
            }

            return Task.FromResult(dataSource);
        }
    }
}
