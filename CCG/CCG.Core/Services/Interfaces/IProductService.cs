using CCG.Core.Models.DTOs.Request;
using CCG.Core.Models.DTOs.Response;

namespace CCG.Core.Services.Interfaces
{
    public interface IProductService
    {
        Task<ProductResponse> AddProductAsync(AddProductRequest addProductRequest);
        Task<bool> DeleteProductAsync(Guid productId, Guid supplierId);
        Task<ProductResponse?> GetProductByIdAsync(Guid productId);
        Task<List<ProductResponse>> GetProductsAsync();
        Task<bool> UpdateProductAsync(Guid productId, UpdateProductRequest updateProductRequest);
    }
}