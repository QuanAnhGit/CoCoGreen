using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Request
{
    public class VerifyTokenRequest
    {
        public Guid Id { get; set; }
        public Guid TokenId { get; set; }
        public required string Token { get; set; }
    }
}
