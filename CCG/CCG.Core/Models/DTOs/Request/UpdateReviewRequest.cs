using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Request
{
    public class UpdateReviewRequest
    {
        public short? Rating { get; set; }
        public string? Comment { get; set; }
    }
}
