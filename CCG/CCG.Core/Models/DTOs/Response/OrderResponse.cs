using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Response
{
    public class OrderResponse
    {
        public required string OrderId { get; set; }
        public required string ReceiptId { get; set; }
        public Guid SupplierId { get; set; }
        public short Status { get; set; }
        public decimal ShippingFee { get; set; }
        public decimal Discount { get; set; }
        public string? TrackingNumber { get; set; }
    }
}
