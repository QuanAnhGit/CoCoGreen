using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Response
{
    public class UserResponse
    {
        public Guid UserId { get; set; }
        public required string Username { get; set; }
        public required string DisplayName { get; set; }
        public required string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
