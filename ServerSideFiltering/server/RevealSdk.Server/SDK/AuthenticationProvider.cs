using Reveal.Sdk;

namespace RevealSdk.Server.SDK
{
    public class AuthenticationProvider : IRVAuthenticationProvider
    {
        public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        { 
            IRVDataSourceCredential userCredential = new RVUsernamePasswordDataSourceCredential();
            if (dataSource is RVSqlServerDataSource) userCredential = new RVUsernamePasswordDataSourceCredential("Reveal", "Reveal");
            return Task.FromResult(userCredential);
        }
    }
}
