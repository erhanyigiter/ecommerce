using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecomercefull.Models.Abstract;

namespace ecomercefull.Models
{
public class User : CommonProp
    {
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Address { get; set; }
    }
}