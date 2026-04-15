using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Response
{
    public class ArticleResponse
    {
        public required string ArticleId { get; set; }
        public required string Title { get; set; }
        public string? Context { get; set; }
        public required string Image { get; set; }
        public DateTime DateCreated { get; set; }
        public int ViewCount { get; set; }
    }
}
