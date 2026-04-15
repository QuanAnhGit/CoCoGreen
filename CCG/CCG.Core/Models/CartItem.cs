using System;
using System.Collections.Generic;

namespace CCG.Core.Models;

public partial class CartItem
{
    public Guid UserId { get; set; }

    public Guid ProductId { get; set; }

    public int Amount { get; set; }

    public DateTime DateAdded { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
