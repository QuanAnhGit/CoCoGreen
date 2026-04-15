using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Request
{
    public class AddArticleRequest
    {
        public required string Title { get; set; }
        public string? Context { get; set; }
        public required string Image { get; set; }
    }
}
