using CCG.Core.Models;
using CCG.Core.Models.DTOs.Request;
using CCG.Core.Models.DTOs.Response;
using CCG.Core.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CCG.Core.Services
{
    public class ProductService(CCGContext context) : IProductService
    {
        private readonly CCGContext _context = context;

        internal static ProductResponse MapProduct(Product product)
            => new()
            {
                ProductId = product.ProductId,
                SupplierId = product.SupplierId,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                Features = product.Features,
                Specs = product.Specs,
                InStock = product.InStock,
                CategoryId = product.CategoryId,
                Cat = product.Cat,
                Image = product.Image,
                Discount = product.Discount
            };

        public async Task<List<ProductResponse>> GetProductsAsync()
        {
            List<Product> products = await _context.Products
                .AsNoTracking()
                .Where(p => !p.IsDeleted)
                .ToListAsync();
            return [.. products.Select(MapProduct)];
        }

        public async Task<ProductResponse?> GetProductByIdAsync(Guid productId)
        {
            Product? product = await _context.Products
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product is null || product.IsDeleted)
                return null;
            return MapProduct(product);
        }

        public async Task<ProductResponse> AddProductAsync(AddProductRequest addProductRequest)
        {
            Product product = new()
            {
                ProductId = Guid.NewGuid(),
                SupplierId = addProductRequest.SupplierId,
                Name = addProductRequest.Name,
                Price = addProductRequest.Price,
                Description = addProductRequest.Description,
                Features = addProductRequest.Features,
                Specs = addProductRequest.Specs,
                InStock = addProductRequest.InStock,
                CategoryId = addProductRequest.CategoryId,
                Cat = addProductRequest.Cat,
                Image = addProductRequest.Image,
                Discount = addProductRequest.Discount
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return MapProduct(product);
        }

        public async Task<bool> UpdateProductAsync(Guid productId, UpdateProductRequest updateProductRequest)
        {
            Product? product = await _context.Products
                .FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product is null
                || product.IsDeleted
                || product.SupplierId != updateProductRequest.SupplierId)
                return false;
            if (updateProductRequest.Name is not null)
                product.Name = updateProductRequest.Name;
            if (updateProductRequest.Price is not null)
                product.Price = (decimal)updateProductRequest.Price;
            if (updateProductRequest.Description is not null)
                product.Description = updateProductRequest.Description;
            if (updateProductRequest.Features is not null)
                product.Features = updateProductRequest.Features;
            if (updateProductRequest.Specs is not null)
                product.Specs = updateProductRequest.Specs;
            if (updateProductRequest.InStock is not null)
                product.InStock = (int)updateProductRequest.InStock;
            if (updateProductRequest.CategoryId is not null)
                product.CategoryId = (int) updateProductRequest.CategoryId;
            if (updateProductRequest.Cat is not null)
                product.Cat = updateProductRequest.Cat;
            if (updateProductRequest.Image is not null)
                product.Image = updateProductRequest.Image;
            if (updateProductRequest.Discount is not null)
                product.Discount = updateProductRequest.Discount;
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProductAsync(Guid productId, Guid supplierId)
        {
            Product? product = await _context.Products
                .FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product is null
                || product.IsDeleted
                || product.SupplierId != supplierId)
                return false;
            product.IsDeleted = true;
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
