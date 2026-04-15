using System;
using System.Collections.Generic;

namespace CCG.Core.Models;

public partial class UserToken
{
    public Guid UserTokenId { get; set; }

    public Guid UserId { get; set; }

    public string Token { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public DateTime ExpireTime { get; set; }

    public bool IsDeleted { get; set; }

    public virtual User User { get; set; } = null!;
}
