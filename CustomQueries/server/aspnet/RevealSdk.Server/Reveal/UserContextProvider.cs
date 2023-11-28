using Reveal.Sdk;

namespace RevealSdk.Server.Reveal;

public class UserContextProvider : IRVUserContextProvider
{
    public IRVUserContext GetUserContext(HttpContext aspnetContext)
    {
        //when using standard auth mechanisms, the userId can be obtained using aspnetContext.User.Identity.Name.
        var userIdentityName = aspnetContext.User.Identity?.Name;
        var userId = userIdentityName ?? "guest";

        //add the sales-person-id property 
        var props = new Dictionary<string, object> { { "sales-person-id", 279 } };

        return new RVUserContext(userId, props);
    }
}