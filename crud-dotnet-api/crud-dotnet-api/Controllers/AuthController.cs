using crud_dotnet_api.Data;
using crud_dotnet_api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace crud_dotnet_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly EmployeeRepository _employeeRepository;
        private readonly JwtOption _options;

        public AuthController(EmployeeRepository employeeRepository,IOptions<JwtOption> options)
        {
            _employeeRepository = employeeRepository;
            _options = options.Value;
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto model)
        {
            var employee =await _employeeRepository.GetEmplaoyeeByEmail(model.Email);
            if(employee is null)
            {
                return BadRequest(new { error = "email does not exist" });
            }
            if (employee.Password != model.Password)
            {
                return BadRequest(new { error = "email/password is incorrect." });
            }
            var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Key));
            var crendential = new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>()
            {
                new Claim("Email",model.Email)
            };
            var sToken = new JwtSecurityToken(_options.Key, _options.Issuer, claims, expires: DateTime.Now.AddHours(5), signingCredentials: crendential);
            var token = new JwtSecurityTokenHandler().WriteToken(sToken);
            return Ok(new { token=token});
        }
    }
}
