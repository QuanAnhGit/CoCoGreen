using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Request
{
    public class AddCartItemRequest
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
    }
}
