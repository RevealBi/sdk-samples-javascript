using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Snowflake;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
            RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVSnowflakeDataSourceItem snowflakeDataSourceItem)
            {
                //update underlying data source
                ChangeDataSourceAsync(userContext, snowflakeDataSourceItem.DataSource);

                //only change the table if we have selected our custom data source item
                if (snowflakeDataSourceItem.Id == "MySnowflakeDataSourceItem")
                {
                    snowflakeDataSourceItem.Schema = "TPCDS_SF100TCL";
                    snowflakeDataSourceItem.Table = "CUSTOMER";
                }
            }

            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
            RVDashboardDataSource dataSource)
        {
            if (dataSource is RVSnowflakeDataSource snowflakeDataSource)
            {
                snowflakeDataSource.Account = "your-account";
                snowflakeDataSource.Host = "your-account-host";
                snowflakeDataSource.Database = "SNOWFLAKE_SAMPLE_DATA";
            }

            return Task.FromResult(dataSource);
        }
    }
}