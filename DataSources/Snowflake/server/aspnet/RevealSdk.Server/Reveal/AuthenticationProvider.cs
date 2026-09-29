using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Snowflake;

namespace RevealSdk.Server.Reveal
{
    public class AuthenticationProvider : IRVAuthenticationProvider
    {
        public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext,
            RVDashboardDataSource dataSource)
        {
            IRVDataSourceCredential userCredential = new RVIntegratedAuthenticationCredential();
            if (dataSource is RVSnowflakeDataSource)
            {
                userCredential = new RVUsernamePasswordDataSourceCredential("username", "password");
            }

            return Task.FromResult(userCredential);
        }
    }
}