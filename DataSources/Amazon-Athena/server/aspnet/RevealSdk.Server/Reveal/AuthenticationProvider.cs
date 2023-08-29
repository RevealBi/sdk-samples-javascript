using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Amazon.Athena;

namespace RevealSdk.Server.Reveal
{
    public class AuthenticationProvider : IRVAuthenticationProvider
    {
        public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            IRVDataSourceCredential userCredential = new RVUsernamePasswordDataSourceCredential();
            if (dataSource is RVAthenaDataSource)
            {
                userCredential = new RVAmazonWebServicesCredentials("key", "secret");
            }
            return Task.FromResult(userCredential);
        }
    }
}
