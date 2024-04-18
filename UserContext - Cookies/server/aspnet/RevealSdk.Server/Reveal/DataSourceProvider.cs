using Reveal.Sdk;
using Reveal.Sdk.Data;

namespace RevealSdk.Server.Reveal
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
            //use the user context to perform logic
            var userName = userContext.UserId;

            Console.WriteLine($"User: {userName}");

            return Task.FromResult(dataSource);
        }
    }
}
