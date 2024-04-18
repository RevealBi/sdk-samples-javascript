using Microsoft.AspNetCore.Mvc;

namespace RevealSdk.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        [HttpGet]
        public IActionResult Login()
        {
            //simluate login and create a cookie
            Response.Cookies.Append("userName", "JohnDoe", new CookieOptions
            {
                Secure = true, // Set to true for HTTPS-only cookies (required for SameSite.None)
                HttpOnly = true, // Prevent client-side JavaScript access
                SameSite = SameSiteMode.None // Allow cross-site requests
            });
            return Ok();
        }
    }
}
