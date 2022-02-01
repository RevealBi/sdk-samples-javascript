using Reveal.Sdk;

namespace RevealSdk.Server.Reveal
{
    public class DashboardProvider : IRVDashboardProvider
    {
        public Task<Dashboard> GetDashboardAsync(IRVUserContext userContext, string dashboardId)
        {
            var filePath = Path.Combine(Environment.CurrentDirectory, $"MyDashboardsFolder/{dashboardId}.rdash");
            var dashboard = new Dashboard(filePath);
            return Task.FromResult(dashboard);
        }

        public Task SaveDashboardAsync(IRVUserContext userContext, string dashboardId, Dashboard dashboard)
        {
            throw new NotImplementedException();
        }
    }
}
