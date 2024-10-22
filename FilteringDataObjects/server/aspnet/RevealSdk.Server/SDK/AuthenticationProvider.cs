using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Microsoft.SqlServer;

namespace RevealSdk.Server.SDK
{
    public class AuthenticationProvider : IRVAuthenticationProvider
    {
        public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            IRVDataSourceCredential? userCredential = null;
            if (dataSource is RVSqlServerDataSource) userCredential = new RVUsernamePasswordDataSourceCredential("username", "password");
            return Task.FromResult(userCredential);
        }
    }
}
