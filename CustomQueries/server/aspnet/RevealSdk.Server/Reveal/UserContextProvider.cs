using Reveal.Sdk;

namespace RevealSdk.Server.Reveal;

public class UserContextProvider : IRVUserContextProvider
{
    public IRVUserContext GetUserContext(HttpContext httpContext)
    {
        //when using standard auth mechanisms, the userId can be obtained using aspnetContext.User.Identity.Name.
        var userIdentityName = httpContext.User.Identity?.Name;
        var userId = userIdentityName ?? "guest";

        //get the sales-person-id header set on the client
        var salesPersonId = httpContext.Request.Headers["x-sales-person-id"]; 
        
        //add the sales-person-id property 
        var props = new Dictionary<string, object> { { "sales-person-id", salesPersonId } };

        return new RVUserContext(userId, props);
    }
}