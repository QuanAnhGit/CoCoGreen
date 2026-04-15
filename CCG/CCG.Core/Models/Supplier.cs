using System;
using System.Collections.Generic;

namespace CCG.Core.Models;

public partial class Supplier
{
    public Guid SupplierId { get; set; }

    public string Username { get; set; } = null!;

    public string NormalizedUsername { get; set; } = null!;

    public string DisplayName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string Address { get; set; } = null!;

    public string Region { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public virtual ICollection<SupplierToken> SupplierTokens { get; set; } = new List<SupplierToken>();
}
