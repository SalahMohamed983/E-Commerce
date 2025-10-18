using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DtosLayer.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }

        public string FullName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Email { get; set; } = null!;
        
        public string? AvterImage { get; set; }
        public string AccessToken { get; set; }

        public UserDto()
        { }
        public UserDto(int Id, string FullName, string Password, string Email, string? AvterImage)
        {
            this.Id = Id;
            this.FullName = FullName;
            this.Password = Password;
            this.Email = Email;
            this.AvterImage = AvterImage;
        }
    }
    public class UserAddDto
    {

        public string FullName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Email { get; set; } = null!;

        public UserAddDto()
        { }
        public UserAddDto(string FullName, string Password, string Email)
        {
            this.FullName = FullName;
            this.Password = Password;
            this.Email = Email;
        }
    }
}
