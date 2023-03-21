using Reveal.Sdk;

namespace RevealSdk.Server.Reveal
{
    public class AuthenticationProvider : IRVAuthenticationProvider
    {
        public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            IRVDataSourceCredential userCredential = new RVUsernamePasswordDataSourceCredential();
            if (dataSource is RVSqlServerDataSource)
            {
                userCredential = new RVUsernamePasswordDataSourceCredential("username", "password");
            }
            return Task.FromResult(userCredential);
        }
    }
}
