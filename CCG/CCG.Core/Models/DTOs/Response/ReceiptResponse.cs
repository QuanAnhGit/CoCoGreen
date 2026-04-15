using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Response
{
    public class ReceiptResponse
    {
        public required string ReceiptId { get; set; }
        public Guid UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
    }
}
