using System;
using System.Collections.Generic;

namespace CCG.Core.Models;

public partial class Receipt
{
    public string ReceiptId { get; set; } = null!;

    public Guid UserId { get; set; }

    public DateTime DateCreated { get; set; }

    public decimal Discount { get; set; }

    public decimal Total { get; set; }

    public bool IsHidden { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User User { get; set; } = null!;
}
