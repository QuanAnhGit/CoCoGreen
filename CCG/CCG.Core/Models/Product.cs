using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CCG.Core.Models;

public partial class Product
{
    public Guid ProductId { get; set; }

    public Guid SupplierId { get; set; }

    public string Name { get; set; } = null!;

    public decimal Price { get; set; }

    public string? Description { get; set; }

    public List<string>? Features { get; set; }

    public string Specs { get; set; } = null!;

    public int InStock { get; set; }

    public bool IsDeleted { get; set; }

    public int CategoryId { get; set; }

    public string Cat { get; set; } = null!;

    public string Image { get; set; } = null!;

    public decimal? Discount { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual Supplier Supplier { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
