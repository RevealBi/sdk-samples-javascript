using Reveal.Sdk;

namespace RevealSdk.Server.Reveal
{
    public class Encoder : IRVObjectEncoder
    {
        public Task<RVDashboardDataSource> Encode(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            if (dataSource is RVSqlServerDataSource sqlDataSource)
                EncodeDataSource(sqlDataSource);
            
            return Task.FromResult(dataSource);
        }

        public Task<RVDataSourceItem> Encode(IRVUserContext userContext, RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVSqlServerDataSourceItem sqlDataSourceItem)
            {
                var sqlDataSource = (RVSqlServerDataSource)sqlDataSourceItem.DataSource;
                EncodeDataSource(sqlDataSource);

                sqlDataSourceItem.Database = "DB";
                sqlDataSourceItem.Schema = "SCHEMA";
            }
            return Task.FromResult(dataSourceItem);
        }

        private void EncodeDataSource(RVSqlServerDataSource sqlDataSource)
        {
            sqlDataSource.Host = "HOST";
            sqlDataSource.Database = "DB";
            sqlDataSource.Schema = "SCHEMA";
        }
    }
}
