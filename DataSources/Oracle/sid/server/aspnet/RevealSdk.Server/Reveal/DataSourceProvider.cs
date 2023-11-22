using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Oracle;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
            RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVOracleDataSourceItem oracleDataSourceItem)
            {
                //update underlying data source
                ChangeDataSourceAsync(userContext, oracleDataSourceItem.DataSource);

                //only change the table if we have selected our custom data source item
                if (oracleDataSourceItem.Id == "MyOracleDataSourceItem")
                {
                    oracleDataSourceItem.Table = "your-table";
                }
            }

            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
            RVDashboardDataSource dataSource)
        {
            if (dataSource is RVOracleSIDDataSource oracleSidDataSource)
            {
                oracleSidDataSource.Host = "your-host";
                oracleSidDataSource.Database = "your-database";
                oracleSidDataSource.SID = "your-sid";
            }

            return Task.FromResult(dataSource);
        }
    }
}