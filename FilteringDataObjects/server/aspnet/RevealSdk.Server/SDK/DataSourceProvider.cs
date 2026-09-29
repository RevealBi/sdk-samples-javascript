using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Microsoft.SqlServer;

namespace RevealSdk.Server.SDK
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public async Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
        {
            await ChangeDataSourceAsync(userContext, dataSourceItem.DataSource);
            return dataSourceItem;
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            if (dataSource is RVSqlServerDataSource sqlServer)
            {
                sqlServer.Host = "localhost";
                sqlServer.Database = "Northwind";
                sqlServer.TrustServerCertificate = true; //required for debugging with self-signed certificates, should be false in production
            }

            return Task.FromResult(dataSource);
        }
    }
}
