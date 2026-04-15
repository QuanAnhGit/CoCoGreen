using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Response
{
    public class CartItemResponse
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
