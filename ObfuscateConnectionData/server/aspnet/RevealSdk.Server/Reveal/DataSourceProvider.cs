using Reveal.Sdk;

namespace RevealSdk.Server.Reveal
{
    public class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVSqlServerDataSourceItem sqlDataSourceItem)
            {
                var sqlDataSource = (RVSqlServerDataSource)sqlDataSourceItem.DataSource;
                UpdateDataSource(sqlDataSource);

                sqlDataSourceItem.Database = "AutoPeople";
                sqlDataSourceItem.Schema = "dbo";
            }
            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            if (dataSource is RVSqlServerDataSource sqlDataSource)
                UpdateDataSource(sqlDataSource);
            
            return Task.FromResult(dataSource);
        }

        private void UpdateDataSource(RVSqlServerDataSource sqlDataSource)
        {
            sqlDataSource.Host = "autosdbserver.database.windows.net";
            sqlDataSource.Database = "AutoPeople";
            sqlDataSource.Schema = "dbo";
        }
    }
}
