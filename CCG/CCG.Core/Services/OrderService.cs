using CCG.Core.Models;
using CCG.Core.Models.DTOs.Request;
using CCG.Core.Models.DTOs.Response;
using CCG.Core.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace CCG.Core.Services
{
    public class OrderService(CCGContext context) : IOrderService
    {
        private readonly CCGContext _context = context;

        internal static ReceiptResponse MapReceipt(Receipt receipt)
        {
            return new()
            {
                ReceiptId = receipt.ReceiptId,
                UserId = receipt.UserId,
                DateCreated = receipt.DateCreated,
                Discount = receipt.Discount,
                Total = receipt.Total,
            };
        }

        internal static OrderResponse MapOrder(Order order)
        {
            return new()
            {
                OrderId = order.OrderId,
                ReceiptId = order.ReceiptId,
                SupplierId = order.SupplierId,
                Status = order.Status,
                ShippingFee = order.ShippingFee,
                Discount = order.Discount,
                TrackingNumber = order.TrackingNumber,
            };
        }

        internal static OrderItemResponse MapOrderItem(OrderItem orderItem)
        {
            return new()
            {
                OrderId = orderItem.OrderId,
                ProductId = orderItem.ProductId,
                Amount = orderItem.Amount,
                PriceAtPurchase = orderItem.PriceAtPurchase,
            };
        }

        internal static CartItemResponse MapCartItem(CartItem cartItem)
        {
            return new()
            {
                UserId = cartItem.UserId,
                ProductId = cartItem.ProductId,
                Amount = cartItem.Amount,
                DateAdded = cartItem.DateAdded,
            };
        }

        public async Task<List<ReceiptResponse>> GetReceiptsAsync()
        {
            List<Receipt> receipts = await _context.Receipts
                .AsNoTracking()
                .Where(r => !r.IsHidden)
                .ToListAsync();
            return [.. receipts.Select(MapReceipt)];
        }

        public async Task<List<OrderResponse>> GetOrdersAsync()
        {
            List<Order> orders = await _context.Orders
                .AsNoTracking()
                .ToListAsync();
            return [.. orders.Select(MapOrder)];
        }

        public async Task<List<ReceiptResponse>> GetReceiptsByUserIdAsync(Guid userId)
        {
            List<Receipt> receipts = await _context.Receipts
                .AsNoTracking()
                .Where(r => !r.IsHidden)
                .Where(r => r.UserId == userId)
                .ToListAsync();
            return [.. receipts.Select(MapReceipt)];
        }

        public async Task<List<OrderResponse>> GetOrdersByUserIdAsync(Guid userId)
        {
            List<Order> orders = await _context.Orders
                .AsNoTracking()
                .Include(o => o.Receipt)
                .Where(o => o.Receipt.UserId == userId)
                .ToListAsync();
            return [.. orders.Select(MapOrder)];
        }

        public async Task<ReceiptResponse?> GetReceiptByIdAsync(string receiptId)
        {
            Receipt? receipt = await _context.Receipts
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.ReceiptId == receiptId);
            return receipt is null ? null : MapReceipt(receipt);
        }

        public async Task<OrderResponse?> GetOrderByIdAsync(string orderId)
        {
            Order? order = await _context.Orders
                .AsNoTracking()
                .FirstOrDefaultAsync(o => o.OrderId == orderId);
            return order is null ? null : MapOrder(order);
        }

        public async Task<List<OrderItemResponse>> GetOrderItemsByOrderAsync(string orderId)
        {
            List<OrderItem> orderItems = await _context.OrderItems
                .AsNoTracking()
                .Where(oi => oi.OrderId == orderId)
                .ToListAsync();
            return [.. orderItems.Select(MapOrderItem)];
        }

        public async Task<List<CartItemResponse>> GetCartItemsByUserIdAsync(Guid userId)
        {
            List<CartItem> cartItems = await _context.CartItems
                .AsNoTracking()
                .Where(ci => ci.UserId == userId)
                .ToListAsync();
            return [.. cartItems.Select(MapCartItem)];
        }

        public async Task<CartItemResponse?> AddCartItemAsync(AddCartItemRequest addCartItemRequest)
        {
            bool isValid = await _context.Users.AnyAsync(u => u.UserId == addCartItemRequest.UserId && !u.IsDeleted)
                && await _context.Products.AnyAsync(p => p.ProductId == addCartItemRequest.ProductId && !p.IsDeleted);

            if (!isValid)
                return null;

            CartItem? existingCartItem = await _context.CartItems.FindAsync(addCartItemRequest.UserId, addCartItemRequest.ProductId);
            if (existingCartItem is not null)
            {
                existingCartItem.Amount += addCartItemRequest.Amount;
                await _context.SaveChangesAsync();
                return MapCartItem(existingCartItem);
            }

            CartItem cartItem = new()
            {
                UserId = addCartItemRequest.UserId,
                ProductId = addCartItemRequest.ProductId,
                Amount = addCartItemRequest.Amount,
                DateAdded = DateTime.UtcNow,
            };
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();
            return MapCartItem(cartItem);
        }

        public async Task<ReceiptResponse?> CheckoutCartAsync(Guid userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                List<CartItem> cartItems = await _context.CartItems
                .Where(ci => ci.UserId == userId)
                .Include(ci => ci.Product)
                .ToListAsync();

                if (cartItems.Count == 0)
                    return null;

                decimal totalPrice = 0;
                foreach (CartItem cartItem in cartItems)
                {
                    if (cartItem.Product is null || cartItem.Product.IsDeleted)
                        throw new InvalidOperationException($"Product with ID {cartItem.ProductId} is no longer available.");
                    int rowAffected = await _context.Products
                        .Where(p => p.ProductId == cartItem.ProductId && p.InStock >= cartItem.Amount)
                        .ExecuteUpdateAsync(setters => setters
                            .SetProperty(p => p.InStock, p => p.InStock - cartItem.Amount));
                    if (rowAffected == 0)
                    {
                        throw new InvalidOperationException($"Not enough stock for product {cartItem.Product.Name}");
                    }
                    totalPrice += cartItem.Amount * cartItem.Product.Price;
                }

                decimal discount = 0; // to be implemented

                Receipt receipt = new()
                {
                    ReceiptId = RandomNumberGenerator.GetString("23456789ABCDEFGHJKLMNPQRSTUVWXYZ", 8),
                    UserId = userId,
                    DateCreated = DateTime.UtcNow,
                    Discount = discount,
                    Total = totalPrice - discount,
                    IsHidden = false,
                };
                _context.Receipts.Add(receipt);

                var itemsBySupplier = cartItems.GroupBy(ci => ci.Product.SupplierId);

                foreach (var supplierGroup in itemsBySupplier)
                {
                    Guid supplierId = supplierGroup.Key;

                    Order order = new()
                    {
                        OrderId = RandomNumberGenerator.GetString("23456789ABCDEFGHJKLMNPQRSTUVWXYZ", 8),
                        ReceiptId = receipt.ReceiptId,
                        SupplierId = supplierId,
                        Status = 3,
                        ShippingFee = 0, // to be implemented
                        Discount = 0, // to be implemented
                        TrackingNumber = null,
                    };
                    _context.Orders.Add(order);

                    foreach (CartItem cartItem in supplierGroup)
                    {
                        OrderItem orderItem = new()
                        {
                            OrderId = order.OrderId,
                            ProductId = cartItem.ProductId,
                            Amount = cartItem.Amount,
                            PriceAtPurchase = cartItem.Product.Price,
                        };
                        _context.OrderItems.Add(orderItem);
                    }
                }

                _context.CartItems.RemoveRange(cartItems);

                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return MapReceipt(receipt);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> UpdateCartItemAsync(Guid userId, Guid productId, UpdateCartItemRequest updateCartItemRequest)
        {
            CartItem? cartItem = await _context.CartItems.FindAsync(userId, productId);
            if (cartItem is null)
                return false;
            if (updateCartItemRequest.Amount is not null)
                if (updateCartItemRequest.Amount <= 0)
                {
                    _context.CartItems.Remove(cartItem);
                }
                else cartItem.Amount = (int)updateCartItemRequest.Amount;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCartItemAsync(Guid userId, Guid productId)
        {
            CartItem? cartItem = await _context.CartItems.FindAsync(userId, productId);
            if (cartItem is null)
                return false;
            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> HideReceiptAsync(string receiptId)
        {
            Receipt? receipt = await _context.Receipts.FindAsync(receiptId);
            if (receipt is null)
                return false;
            receipt.IsHidden = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
