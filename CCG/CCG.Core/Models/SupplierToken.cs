using System;
using System.Collections.Generic;

namespace CCG.Core.Models;

public partial class SupplierToken
{
    public Guid SupplierTokenId { get; set; }

    public Guid SupplierId { get; set; }

    public string Token { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public DateTime ExpireTime { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Supplier Supplier { get; set; } = null!;
}
