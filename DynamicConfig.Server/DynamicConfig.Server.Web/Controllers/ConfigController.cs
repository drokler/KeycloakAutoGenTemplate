using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DynamicConfig.Server.Web.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Policy = "admin")]
public class ConfigController : Controller
{
    [HttpGet]
    public Task<string> Get()
    {
        return Task.FromResult("test");
    }
}