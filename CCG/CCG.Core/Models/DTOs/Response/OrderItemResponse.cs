using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Response
{
    public class OrderItemResponse
    {
        public required string OrderId { get; set; }
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
        public decimal PriceAtPurchase { get; set; }
    }
}
