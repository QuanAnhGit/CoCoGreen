using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Request
{
    public class UpdateUserRequest
    {
        public string? DisplayName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
    }
}
