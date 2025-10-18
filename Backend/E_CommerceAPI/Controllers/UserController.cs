using APILayer.Jwt;
using BusinessLayer.CoreOfLogicOperations;
using BusinessLayer.Interfaces;
using BusinessLayer.Services;
using DtosLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static BusinessLayer.CoreOfLogicOperations.ProductService;

namespace APILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUser _user;

        private JwtOptions _jwtOptions;
        public UserController(IUser user, JwtOptions jwtOptions)
        {
            this._jwtOptions = jwtOptions;
            this._user = user;
        }


        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDto>> GetUser(string password, string email)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(email))
                return BadRequest("Parameter Are Wrong");

            UserService user = await _user.FindUserByPasswordAndEmail(password, email);
            if (user == null)
                return NotFound("User Not Found!");

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _jwtOptions.Issuer,
                Audience = _jwtOptions.Audience,
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SigningKey)),
                SecurityAlgorithms.HmacSha256),
                Subject = (password == "Admin" && email == "Admin@gmail.com") ? new ClaimsIdentity(new Claim[]
                {
                    new(ClaimTypes.Email, email),
                    new(ClaimTypes.Name, user.FullName),
                    new(ClaimTypes.Role, "Admin"),
                }) : new ClaimsIdentity(new Claim[]
                {
                    new(ClaimTypes.Email, email),
                    new(ClaimTypes.Name, user.FullName),
                })
            };
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(securityToken);

            UserDto userDto = user.userDto;

            userDto.AccessToken = accessToken;

            //userDto.AccessToken = 
            return Ok(userDto);
        }

        [AllowAnonymous]
        [HttpGet("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
           List<UserDto> userList = await _user.GetAllUsers();

            if (userList == null)
                return NotFound("Products Not Found!");

            return Ok(userList);
        }
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateUser(UserDto userdto)
        {
            if (string.IsNullOrEmpty(userdto.FullName) || string.IsNullOrEmpty(userdto.Password))
                return BadRequest("Parameter Are Wrong");

            try
            {
            UserService user = await _user.FindUserById(userdto.Id);

            if (user == null)
                return NotFound("Products Not Found!");

            user.Initialize(userdto, UserService.enMode.enUpdate);

                await user.Save();
                return Ok("User Update Successfuly!");
            //else
                //return StatusCode(500, "Error!");

            }catch(Exception ex)
            {
                return StatusCode(500, ex.Message);

            }
        }

        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddUser(UserAddDto userdto)
        {
            if (string.IsNullOrEmpty(userdto.FullName) || string.IsNullOrEmpty(userdto.Password))
                return BadRequest("Parameter Are Wrong");

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _jwtOptions.Issuer,
                Audience = _jwtOptions.Audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SigningKey)),
                    SecurityAlgorithms.HmacSha256)
            };
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            _user.Initialize(userdto, UserService.enMode.enAdd);

            if (await _user.Save())
            {
                return Ok(true);

            }
            else
                return Ok(false);


        }

        [HttpDelete("{ID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteUser(int ID)
        {
            if (ID < 0)
                return BadRequest("Parameter Are Wrong");


            if (await _user.Delete(ID))
                return Ok("Delete Successfully!");
            else
                return NotFound("Products Not Found!");

        }



    }
}
