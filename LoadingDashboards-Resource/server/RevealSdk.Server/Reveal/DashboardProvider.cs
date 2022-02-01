using Reveal.Sdk;
using System.Reflection;

namespace RevealSdk.Server.Reveal
{
    public class DashboardProvider : IRVDashboardProvider
    {
        public Task<Dashboard> GetDashboardAsync(IRVUserContext userContext, string dashboardId)
        {
            var resource = Assembly.GetExecutingAssembly().GetManifestResourceStream($"RevealSdk.Server.Dashboards.{dashboardId}.rdash");
            using (resource)
            {
                var dashboard = new Dashboard(resource);
                return Task.FromResult(dashboard);
            }
        }

        public Task SaveDashboardAsync(IRVUserContext userContext, string dashboardId, Dashboard dashboard)
        {
            throw new NotImplementedException();
        }
    }
}
