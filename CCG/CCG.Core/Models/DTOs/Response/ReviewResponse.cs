using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Response
{
    public class ReviewResponse
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public required short Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
