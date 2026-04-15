using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Request
{
    public class AddReviewRequest
    {
        public Guid UserId { get; set; }

        public Guid ProductId { get; set; }
        public short Rating { get; set; }
        public string? Comment { get; set; }
    }
}
