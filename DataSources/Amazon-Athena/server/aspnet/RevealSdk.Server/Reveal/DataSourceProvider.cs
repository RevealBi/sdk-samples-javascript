using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Amazon.Athena;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public async Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
        {
            await ChangeDataSourceAsync(userContext, dataSourceItem.DataSource);

            if (dataSourceItem is RVAthenaDataSourceItem dsi)
            {
                if (dsi.Id == "my-data-source-item")
                {
                    dsi.Table = "your_table_name";
                }
            }

            return dataSourceItem;
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            if (dataSource is RVAthenaDataSource databricksDataSource)
            {
                databricksDataSource.Region = "your_region";
                databricksDataSource.Database = "your_database_name";
            }

            return Task.FromResult(dataSource);
        }
    }
}