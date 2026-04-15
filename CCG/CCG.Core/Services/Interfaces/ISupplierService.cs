using CCG.Core.Models.DTOs.Request;
using CCG.Core.Models.DTOs.Response;

namespace CCG.Core.Services.Interfaces
{
    public interface ISupplierService
    {
        Task<bool> ChangePasswordAsync(ChangePasswordRequest changePasswordRequest, bool forced);
        Task DeleteSupplierAsync(Guid supplierId);
        Task<SupplierResponse?> GetSupplierByIdAsync(Guid supplierId);
        Task<List<SupplierResponse>> GetSuppliersAsync();
        Task<SupplierResponse?> LoginAsync(LoginRequest loginRequest);
        Task<SupplierResponse?> RegisterAsync(RegisterRequest registerRequest);
        Task<Guid?> ResetPasswordAsync(ResetPasswordRequest resetPasswordRequest);
        Task<bool> UpdateSupplierAsync(Guid suplierId, UpdateSupplierRequest updateSupplierRequest);
        Task<bool> VerifyToken(VerifyTokenRequest verifyTokenRequest);
    }
}