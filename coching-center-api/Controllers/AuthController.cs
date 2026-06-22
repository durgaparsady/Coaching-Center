using coching_center_api.Contracts;
using coching_center_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace coching_center_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly JwtTokenService _jwtTokenService;

    public AuthController(IConfiguration configuration, JwtTokenService jwtTokenService)
    {
        _configuration = configuration;
        _jwtTokenService = jwtTokenService;
    }

    [HttpPost("login")]
    public ActionResult<LoginResponse> Login([FromBody] LoginRequest request)
    {
        var adminSection = _configuration.GetSection("Admin");
        var configuredUser = adminSection["Username"] ?? "admin";
        var configuredPassword = adminSection["Password"] ?? "Admin@123";

        if (!string.Equals(request.Username, configuredUser, StringComparison.OrdinalIgnoreCase) ||
            request.Password != configuredPassword)
        {
            return Unauthorized("Invalid admin credentials");
        }

        var (token, expiresAtUtc) = _jwtTokenService.GenerateAdminToken(configuredUser);
        return Ok(new LoginResponse(token, configuredUser, expiresAtUtc));
    }
}
