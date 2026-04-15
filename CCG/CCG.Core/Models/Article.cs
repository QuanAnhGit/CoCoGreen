using System;
using System.Collections.Generic;

namespace CCG.Core.Models;

public partial class Article
{
    public string ArticleId { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? Context { get; set; }

    public string Image { get; set; } = null!;

    public DateTime DateCreated { get; set; }

    public int ViewCount { get; set; }

    public bool IsDeleted { get; set; }
}
