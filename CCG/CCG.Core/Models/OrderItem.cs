using System;
using System.Collections.Generic;

namespace CCG.Core.Models;

public partial class OrderItem
{
    public string OrderId { get; set; } = null!;

    public Guid ProductId { get; set; }

    public int Amount { get; set; }

    public decimal PriceAtPurchase { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
