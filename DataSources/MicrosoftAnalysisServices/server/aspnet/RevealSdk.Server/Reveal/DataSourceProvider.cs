using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Microsoft.AnalysisServices;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider: IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
        {
            ChangeDataSourceAsync(userContext, dataSourceItem.DataSource);

            if (dataSourceItem is RVAnalysisServicesDataSourceItem dsi)
            {
                if (dsi.Id == "AnalysisServicesDataSourceItem")
                {
                    dsi.Cube = "cube";
                }
            }

            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            if (dataSource is RVHttpAnalysisServicesDataSource ds)
            {
                ds.Url = "url";
                ds.Catalog = "catalog";
            }
            else if (dataSource is RVNativeAnalysisServicesDataSource nds)
            {
                nds.Host = "host";
                nds.Catalog = "catalog";
            }

            return Task.FromResult(dataSource);
        }
    }
}
