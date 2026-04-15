using System;
using System.Collections.Generic;
using System.Text;

namespace CCG.Core.Models.DTOs.Request
{
    public class UpdateProductRequest
    {
        public required Guid SupplierId { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; }
        public string? Description { get; set; }
        public List<string>? Features { get; set; }
        public string? Specs { get; set; }
        public int? InStock { get; set; }
        public int? CategoryId { get; set; }
        public string? Cat { get; set; }
        public string? Image { get; set; }
        public decimal? Discount { get; set; }
    }
}
