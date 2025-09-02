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
                    new RVPersonalAccessTokenDataSourceCredential("your_personal_access_token");
            }

            return Task.FromResult(userCredential);
        }
    }
}