using Google.Apis.Auth.OAuth2;
using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Google.Drive;

namespace RevealSdk.Server.Reveal
{
    public class AuthenticationProvider : IRVAuthenticationProvider
    {
        string _token = string.Empty;
        public async Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            IRVDataSourceCredential userCredential = new RVUsernamePasswordDataSourceCredential();
            if (dataSource is RVGoogleDriveDataSource)
            {
                if (string.IsNullOrEmpty(_token))
                    _token = await CreateJwtToken();

                userCredential = new RVBearerTokenDataSourceCredential(_token, null);
            }

            return userCredential;
        }

        async Task<string> CreateJwtToken()
        {
            var pathToJsonFile = Path.Combine(Environment.CurrentDirectory, "assets/auth.json");
            var credentials = GoogleCredential.FromFile(pathToJsonFile).CreateScoped("https://www.googleapis.com/auth/drive",
                                                                                     "https://www.googleapis.com/auth/userinfo.email",
                                                                                     "https://www.googleapis.com/auth/userinfo.profile");
            var token = await credentials.UnderlyingCredential.GetAccessTokenForRequestAsync().ConfigureAwait(false);
            return token;
        }
    }
}
