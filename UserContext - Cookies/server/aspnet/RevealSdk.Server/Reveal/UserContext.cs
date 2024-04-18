using Reveal.Sdk;

namespace RevealSdk.Server.Reveal
{
    public class UserContext : IRVUserContextProvider
    {
        public IRVUserContext GetUserContext(HttpContext aspnetContext)
        {
            //cookie that is set in the LoginController, and passed from the client
            var userId = aspnetContext.Request.Cookies["userName"];
            return new RVUserContext(userId);
        }
    }
}
