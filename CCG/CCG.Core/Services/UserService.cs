using CCG.Core.Models;
using CCG.Core.Models.DTOs.Request;
using CCG.Core.Models.DTOs.Response;
using CCG.Core.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;

namespace CCG.Core.Services
{
    public class UserService(CCGContext context, IEmailService emailService) : IUserService
    {
        private readonly CCGContext _context = context;
        private readonly IEmailService _emailService = emailService;

        internal static UserResponse MapUser(User user) => new()
        {
            UserId = user.UserId,
            Username = user.Username,
            DisplayName = user.DisplayName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            Address = user.Address,
            DateCreated = user.DateCreated,
        };

        public async Task<List<UserResponse>> GetUsersAsync()
        {
            List<User> users = await _context.Users
                .AsNoTracking()
                .Where(u => !u.IsDeleted)
                .ToListAsync();
            return [.. users.Select(MapUser)];
        }

        public async Task<UserResponse?> GetUserByIdAsync(Guid userId)
        {
            User? user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.UserId == userId);
            return user is not null ? MapUser(user) : null;
        }

        public async Task<bool> UpdateUserAsync(Guid userId, UpdateUserRequest updateUserRequest)
        {
            User? user = await _context.Users.FindAsync(userId);
            if (user is not null && !user.IsDeleted)
            {
                if (updateUserRequest.DisplayName is not null)
                    user.DisplayName = updateUserRequest.DisplayName;
                if (updateUserRequest.Email is not null)
                    user.Email = updateUserRequest.Email;
                if (updateUserRequest.PhoneNumber is not null)
                    user.PhoneNumber = updateUserRequest.PhoneNumber;
                if (updateUserRequest.Address is not null)
                    user.Address = updateUserRequest.Address;
            }
            else
            {
                return false;
            }
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            User? user = await _context.Users.FindAsync(userId);
            if (user is not null)
            {
                user.IsDeleted = true;
                await _context.SaveChangesAsync();
            }
        }

        private static string GenerateSalt() =>
            Convert.ToBase64String(RandomNumberGenerator.GetBytes(16));

        private static string Hash(string password, string salt)
        {
            byte[] hash = Rfc2898DeriveBytes.Pbkdf2(
                password,
                Encoding.UTF8.GetBytes(salt),
                210_000,
                HashAlgorithmName.SHA256,
                32);
            return Convert.ToBase64String(hash);
        }

        internal async Task<UserToken> AddUserTokenAsync(User user, string newToken)
        {
            string salt = GenerateSalt();
            string hashedToken = Hash(newToken, salt);
            UserToken userToken = new()
            {
                UserTokenId = Guid.NewGuid(),
                UserId = user.UserId,
                Token = hashedToken,
                Salt = salt,
                ExpireTime = DateTime.UtcNow.AddMinutes(5),
                IsDeleted = false
            };
            await _context.UserTokens
                .Where(t => t.UserId == user.UserId && !t.IsDeleted)
                .ExecuteUpdateAsync(t => t.SetProperty(x => x.IsDeleted, true));
            _context.UserTokens.Add(userToken);
            await _context.SaveChangesAsync();
            return userToken;
        }

        public async Task<UserResponse?> LoginAsync(LoginRequest loginRequest)
        {
            string normalizedUsername = loginRequest.Username.ToUpperInvariant();
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.NormalizedUsername == normalizedUsername);
            if (user is not null && !user.IsDeleted)
            {
                string hashedPassword = Hash(loginRequest.Password, user.Salt);
                if (CryptographicOperations.FixedTimeEquals(
                    Convert.FromBase64String(hashedPassword),
                    Convert.FromBase64String(user.Password)))
                {
                    return MapUser(user);
                }
            }
            return null;
        }

        public async Task<UserResponse?> RegisterAsync(RegisterRequest registerRequest)
        {
            string salt = GenerateSalt();
            string hashedPassword = Hash(registerRequest.Password, salt);
            User newUser = new()
            {
                UserId = Guid.NewGuid(),
                Username = registerRequest.Username,
                NormalizedUsername = registerRequest.Username.ToUpperInvariant(),
                Password = hashedPassword,
                Salt = salt,
                DisplayName = registerRequest.DisplayName,
                Email = registerRequest.Email,
                PhoneNumber = registerRequest.PhoneNumber,
                Address = registerRequest.Address,
                DateCreated = DateTime.UtcNow,
                IsDeleted = false
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            await _emailService.SendWelcomeEmailAsync(newUser.Email, newUser.DisplayName);
            return MapUser(newUser);
        }

        public async Task<bool> ChangePasswordAsync(ChangePasswordRequest changePasswordRequest, bool forced)
        {
            User? user = await _context.Users.FindAsync(changePasswordRequest.Id);
            if (user is not null)
            {
                if (!forced)
                {
                    string hashedCurrentPassword = Hash(changePasswordRequest.CurrentPassword, user.Salt);
                    if (!CryptographicOperations.FixedTimeEquals(
                        Convert.FromBase64String(hashedCurrentPassword),
                        Convert.FromBase64String(user.Password)))
                    {
                        return false;
                    }
                }
                string newSalt = GenerateSalt();
                string hashedNewPassword = Hash(changePasswordRequest.NewPassword, newSalt);
                user.Password = hashedNewPassword;
                user.Salt = newSalt;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Guid?> ResetPasswordAsync(ResetPasswordRequest resetPasswordRequest)
        {
            User? user;
            if (resetPasswordRequest.Query.Contains('@'))
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.Email == resetPasswordRequest.Query);
            }
            else
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.Username == resetPasswordRequest.Query);
            }

            await Task.Delay(300);

            if (user is not null)
            {
                string newToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
                UserToken userToken = await AddUserTokenAsync(user, newToken);
                if (userToken is not null)
                {
                    try
                    {
                        await _emailService.SendPasswordResetEmailAsync(user.Email, newToken);
                    }
                    catch (Exception ex)
                    {
                        throw new SmtpException("Failed to send password reset email.", ex);
                    }
                }
                else { return null; }
                return userToken.UserTokenId;
            }

            return Guid.NewGuid();
        }

        public async Task<bool> VerifyToken(VerifyTokenRequest verifyTokenRequest)
        {
            User? user = await _context.Users.FindAsync(verifyTokenRequest.Id);
            if (user is not null)
            {
                UserToken? userToken = await _context.UserTokens.FindAsync(verifyTokenRequest.TokenId);
                if (userToken is not null
                    && !userToken.IsDeleted
                    && userToken.UserId == verifyTokenRequest.Id
                    && CryptographicOperations.FixedTimeEquals(
                        Convert.FromBase64String(Hash(verifyTokenRequest.Token, userToken.Salt)),
                        Convert.FromBase64String(userToken.Token)
                    )
                    && userToken.ExpireTime >= DateTime.UtcNow)
                {
                    userToken.IsDeleted = true;
                    _context.UserTokens.Update(userToken);
                    await _context.SaveChangesAsync();
                    return true;
                }
            }
            return false;
        }
    }
}
