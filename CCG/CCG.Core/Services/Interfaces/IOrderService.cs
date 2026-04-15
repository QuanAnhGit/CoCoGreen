using CCG.Core.Models.DTOs.Request;
using CCG.Core.Models.DTOs.Response;

namespace CCG.Core.Services.Interfaces
{
    public interface IOrderService
    {
        Task<CartItemResponse?> AddCartItemAsync(AddCartItemRequest addCartItemRequest);
        Task<ReceiptResponse?> CheckoutCartAsync(Guid userId);
        Task<bool> DeleteCartItemAsync(Guid userId, Guid productId);
        Task<List<CartItemResponse>> GetCartItemsByUserIdAsync(Guid userId);
        Task<OrderResponse?> GetOrderByIdAsync(string orderId);
        Task<List<OrderItemResponse>> GetOrderItemsByOrderAsync(string orderId);
        Task<List<OrderResponse>> GetOrdersAsync();
        Task<List<OrderResponse>> GetOrdersByUserIdAsync(Guid userId);
        Task<ReceiptResponse?> GetReceiptByIdAsync(string receiptId);
        Task<List<ReceiptResponse>> GetReceiptsAsync();
        Task<List<ReceiptResponse>> GetReceiptsByUserIdAsync(Guid userId);
        Task<bool> HideReceiptAsync(string receiptId);
        Task<bool> UpdateCartItemAsync(Guid userId, Guid productId, UpdateCartItemRequest updateCartItemRequest);
    }
}