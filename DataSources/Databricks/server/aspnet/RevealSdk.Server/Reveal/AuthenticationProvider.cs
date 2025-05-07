using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Databricks;

namespace RevealSdk.Server.Reveal
{
    public class AuthenticationProvider : IRVAuthenticationProvider
    {
        public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext,
            RVDashboardDataSource dataSource)
        {
            IRVDataSourceCredential userCredential = null;
            if (dataSource is RVDatabricksDataSource)
            {
                userCredential =
                    new RVBearerTokenDataSourceCredential("your_personal_access_token", "your_userid");
            }

            return Task.FromResult(userCredential);
        }
    }
}