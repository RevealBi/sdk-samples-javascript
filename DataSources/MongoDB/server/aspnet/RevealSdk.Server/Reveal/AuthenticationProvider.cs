using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.MongoDB;

namespace RevealSdk.Server.Reveal
{
    public class AuthenticationProvider : IRVAuthenticationProvider
    {
        public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext,
            RVDashboardDataSource dataSource)
        {
            IRVDataSourceCredential userCredential = new RVUsernamePasswordDataSourceCredential();
            if (dataSource is RVMongoDBDataSource)
            {
                userCredential =
                    new RVUsernamePasswordDataSourceCredential("username", "password", "authenticationDatabase");
            }

            return Task.FromResult(userCredential);
        }
    }
}