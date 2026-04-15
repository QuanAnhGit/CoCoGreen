using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Request
{
    public class UpdateArticleRequest
    {
        public string? Title { get; set; }
        public string? Context { get; set; }
        public string? Image { get; set; }
    }
}
