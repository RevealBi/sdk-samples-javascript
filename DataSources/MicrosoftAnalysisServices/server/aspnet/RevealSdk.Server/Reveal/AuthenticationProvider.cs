using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Microsoft.AnalysisServices;

namespace RevealSdk.Server.Reveal
{
    public class AuthenticationProvider : IRVAuthenticationProvider
    {
        public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            IRVDataSourceCredential userCredential = new RVUsernamePasswordDataSourceCredential();
            if (dataSource is RVAnalysisServicesDataSource)
            {
                userCredential = new RVUsernamePasswordDataSourceCredential("username", "password", "domain");
            }
            return Task.FromResult(userCredential);
        }
    }
}
