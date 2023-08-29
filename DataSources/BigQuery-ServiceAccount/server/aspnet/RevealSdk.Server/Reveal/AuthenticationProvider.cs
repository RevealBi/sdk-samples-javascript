using Google.Apis.Auth.OAuth2;
using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Google.BigQuery;

namespace RevealSdk.Server.Reveal
{
    public class AuthenticationProvider : IRVAuthenticationProvider
    {
        public async Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            IRVDataSourceCredential userCredential = new RVUsernamePasswordDataSourceCredential();
            if (dataSource is RVBigQueryDataSource)
            {
                var token = await CreateJwtToken();
                userCredential = new RVBearerTokenDataSourceCredential(token, null);
            }
            return userCredential;
        }

        async Task<string> CreateJwtToken()
        {
            var pathToJsonFile = Path.Combine(Environment.CurrentDirectory, "assets/bq-auth.json");
            var credentials = GoogleCredential.FromFile(pathToJsonFile);
            var token = await credentials.UnderlyingCredential.GetAccessTokenForRequestAsync("https://bigquery.googleapis.com/").ConfigureAwait(false);
            return token;
        }
    }
}
