using System;
using System.Collections.Generic;

namespace CCG.Core.Models;

public partial class Order
{
    public string OrderId { get; set; } = null!;

    public string ReceiptId { get; set; } = null!;

    public Guid SupplierId { get; set; }

    public short Status { get; set; }

    public decimal ShippingFee { get; set; }

    public decimal Discount { get; set; }

    public string? TrackingNumber { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Receipt Receipt { get; set; } = null!;

    public virtual Supplier Supplier { get; set; } = null!;
}
