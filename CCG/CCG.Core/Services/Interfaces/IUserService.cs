using CCG.Core.Models.DTOs.Request;
using CCG.Core.Models.DTOs.Response;

namespace CCG.Core.Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> ChangePasswordAsync(ChangePasswordRequest changePasswordRequest, bool forced);
        Task DeleteUserAsync(Guid userId);
        Task<UserResponse?> GetUserByIdAsync(Guid userId);
        Task<List<UserResponse>> GetUsersAsync();
        Task<UserResponse?> LoginAsync(LoginRequest loginRequest);
        Task<UserResponse?> RegisterAsync(RegisterRequest registerRequest);
        Task<Guid?> ResetPasswordAsync(ResetPasswordRequest resetPasswordRequest);
        Task<bool> UpdateUserAsync(Guid userId, UpdateUserRequest updateUserRequest);
        Task<bool> VerifyToken(VerifyTokenRequest verifyTokenRequest);
    }
}