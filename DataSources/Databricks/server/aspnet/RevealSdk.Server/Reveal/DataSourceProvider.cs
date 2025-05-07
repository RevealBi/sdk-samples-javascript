using Infragistics.ReportPlus.DataLayer.Providers.Databricks;
using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Databricks;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
            RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVDatabricksDataSourceItem databricksDsi)
            {
                //update underlying data source
                ChangeDataSourceAsync(userContext, databricksDsi.DataSource);

                //only change the table if we have selected our custom data source item
                if (databricksDsi.Id == "MyDatabricksDatasourceItem")
                {
                    databricksDsi.Table = "your_table_name";
                }
            }

            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
            RVDashboardDataSource dataSource)
        {
            if (dataSource is RVDatabricksDataSource databricksDataSource)
            {
                databricksDataSource.Host = "your_server_host";
                databricksDataSource.Port = 443; // 443 is the default port
                databricksDataSource.HttpPath = "your_server_http_path";
                databricksDataSource.Database = "your_database_name";
                databricksDataSource.Schema = "your_schema_name";
            }

            return Task.FromResult(dataSource);
        }
    }
}