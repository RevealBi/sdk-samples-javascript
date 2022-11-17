using Reveal.Sdk;

namespace RevealSdk.Server.Reveal
{
    public class DashboardProvider : IRVDashboardProvider
    {
        public Task<Dashboard> GetDashboardAsync(IRVUserContext userContext, string dashboardId)
        {
            var filePath = Path.Combine(Environment.CurrentDirectory, $"MyDashboards/{dashboardId}.rdash");
            var dashboard = new Dashboard(filePath);
            return Task.FromResult(dashboard);
        }

        public async Task SaveDashboardAsync(IRVUserContext userContext, string dashboardId, Dashboard dashboard)
        {
            var filePath = Path.Combine(Environment.CurrentDirectory, $"MyDashboards/{dashboardId}.rdash");
            await dashboard.SaveToFileAsync(filePath);
        }
    }
}
