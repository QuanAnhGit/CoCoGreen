using System;
using System.Collections.Generic;

namespace CCG.Core.Models;

public partial class Review
{
    public Guid UserId { get; set; }

    public Guid ProductId { get; set; }

    public short Rating { get; set; }

    public string? Comment { get; set; }

    public DateTime DateCreated { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
