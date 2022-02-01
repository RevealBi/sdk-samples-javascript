using Reveal.Sdk;

namespace RevealSdk.Server.Reveal
{
    public class DashboardProvider : IRVDashboardProvider
    {
        public Task<Dashboard> GetDashboardAsync(IRVUserContext userContext, string dashboardId)
        {
            var filePath = Path.Combine(Environment.CurrentDirectory, $"Dashboards/{dashboardId}.rdash");
            using (var stream = File.OpenRead(filePath))
            {
                var dashboard = new Dashboard(stream);
                return Task.FromResult(dashboard);
            }
        }

        public Task SaveDashboardAsync(IRVUserContext userContext, string dashboardId, Dashboard dashboard)
        {
            throw new NotImplementedException();
        }
    }
}
