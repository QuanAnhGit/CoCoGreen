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
    public class SupplierService(CCGContext context, IEmailService emailService) : ISupplierService
    {
        private readonly CCGContext _context = context;
        private readonly IEmailService _emailService = emailService;

        internal static SupplierResponse MapSupplier(Supplier supplier) => new()
        {
            SupplierId = supplier.SupplierId,
            Username = supplier.Username,
            DisplayName = supplier.DisplayName,
            Email = supplier.Email,
            PhoneNumber = supplier.PhoneNumber,
            Address = supplier.Address,
            Region = supplier.Region,
        };

        public async Task<List<SupplierResponse>> GetSuppliersAsync()
        {
            List<Supplier> suppliers = await _context.Suppliers
                .AsNoTracking()
                .Where(u => !u.IsDeleted)
                .ToListAsync();
            return [.. suppliers.Select(MapSupplier)];
        }

        public async Task<SupplierResponse?> GetSupplierByIdAsync(Guid supplierId)
        {
            Supplier? supplier = await _context.Suppliers
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.SupplierId == supplierId);
            return supplier is not null ? MapSupplier(supplier) : null;
        }

        public async Task<bool> UpdateSupplierAsync(Guid suplierId, UpdateSupplierRequest updateSupplierRequest)
        {
            Supplier? supplier = await _context.Suppliers.FindAsync(suplierId);
            if (supplier is not null && !supplier.IsDeleted)
            {
                if (updateSupplierRequest.DisplayName is not null)
                    supplier.DisplayName = updateSupplierRequest.DisplayName;
                if (updateSupplierRequest.Email is not null)
                    supplier.Email = updateSupplierRequest.Email;
                if (updateSupplierRequest.PhoneNumber is not null)
                    supplier.PhoneNumber = updateSupplierRequest.PhoneNumber;
                if (updateSupplierRequest.Address is not null)
                    supplier.Address = updateSupplierRequest.Address;
                if (updateSupplierRequest.Region is not null)
                    supplier.Region = updateSupplierRequest.Region;
            }
            else
            {
                return false;
            }
            _context.Suppliers.Update(supplier);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task DeleteSupplierAsync(Guid supplierId)
        {
            Supplier? supplier = await _context.Suppliers.FindAsync(supplierId);
            if (supplier is not null)
            {
                supplier.IsDeleted = true;
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

        internal async Task<SupplierToken> AddSupplierTokenAsync(Supplier supplier, string newToken)
        {
            string salt = GenerateSalt();
            string hashedToken = Hash(newToken, salt);
            SupplierToken supplierToken = new()
            {
                SupplierTokenId = Guid.NewGuid(),
                SupplierId = supplier.SupplierId,
                Token = hashedToken,
                Salt = salt,
                ExpireTime = DateTime.UtcNow.AddMinutes(5),
                IsDeleted = false
            };
            await _context.SupplierTokens
                .Where(t => t.SupplierId == supplier.SupplierId && !t.IsDeleted)
                .ExecuteUpdateAsync(t => t.SetProperty(x => x.IsDeleted, true));
            _context.SupplierTokens.Add(supplierToken);
            await _context.SaveChangesAsync();
            return supplierToken;
        }

        public async Task<SupplierResponse?> LoginAsync(LoginRequest loginRequest)
        {
            string normalizedUsername = loginRequest.Username.ToUpperInvariant();
            Supplier? supplier = await _context.Suppliers.FirstOrDefaultAsync(u => u.NormalizedUsername == normalizedUsername);
            if (supplier is not null && !supplier.IsDeleted)
            {
                string hashedPassword = Hash(loginRequest.Password, supplier.Salt);
                if (CryptographicOperations.FixedTimeEquals(
                    Convert.FromBase64String(hashedPassword),
                    Convert.FromBase64String(supplier.Password)))
                {
                    return MapSupplier(supplier);
                }
            }
            return null;
        }

        public async Task<SupplierResponse?> RegisterAsync(RegisterRequest registerRequest)
        {
            if (registerRequest.Address is null)
            {
                throw new ArgumentException("Address is required.");
            }
            if (registerRequest.Region is null)
            {
                throw new ArgumentException("Region is required.");
            }
            string salt = GenerateSalt();
            string hashedPassword = Hash(registerRequest.Password, salt);
            Supplier newSupplier = new()
            {
                SupplierId = Guid.NewGuid(),
                Username = registerRequest.Username,
                NormalizedUsername = registerRequest.Username.ToUpperInvariant(),
                Password = hashedPassword,
                Salt = salt,
                DisplayName = registerRequest.DisplayName,
                Email = registerRequest.Email,
                PhoneNumber = registerRequest.PhoneNumber,
                Address = registerRequest.Address,
                Region = registerRequest.Region,
                IsDeleted = false
            };
            _context.Suppliers.Add(newSupplier);
            await _context.SaveChangesAsync();
            await _emailService.SendWelcomeEmailAsync(newSupplier.Email, newSupplier.DisplayName);
            return MapSupplier(newSupplier);
        }

        public async Task<bool> ChangePasswordAsync(ChangePasswordRequest changePasswordRequest, bool forced)
        {
            Supplier? supplier = await _context.Suppliers.FindAsync(changePasswordRequest.Id);
            if (supplier is not null)
            {
                if (!forced)
                {
                    string hashedCurrentPassword = Hash(changePasswordRequest.CurrentPassword, supplier.Salt);
                    if (!CryptographicOperations.FixedTimeEquals(
                        Convert.FromBase64String(hashedCurrentPassword),
                        Convert.FromBase64String(supplier.Password)))
                    {
                        return false;
                    }
                }
                string newSalt = GenerateSalt();
                string hashedNewPassword = Hash(changePasswordRequest.NewPassword, newSalt);
                supplier.Password = hashedNewPassword;
                supplier.Salt = newSalt;
                _context.Suppliers.Update(supplier);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Guid?> ResetPasswordAsync(ResetPasswordRequest resetPasswordRequest)
        {
            Supplier? supplier;
            if (resetPasswordRequest.Query.Contains('@'))
            {
                supplier = await _context.Suppliers.FirstOrDefaultAsync(u => u.Email == resetPasswordRequest.Query);
            }
            else
            {
                supplier = await _context.Suppliers.FirstOrDefaultAsync(u => u.Username == resetPasswordRequest.Query);
            }

            await Task.Delay(300);

            if (supplier is not null)
            {
                string newToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
                SupplierToken supplierToken = await AddSupplierTokenAsync(supplier, newToken);
                if (supplierToken is not null)
                {
                    try
                    {
                        await _emailService.SendPasswordResetEmailAsync(supplier.Email, newToken);
                    }
                    catch (Exception ex)
                    {
                        throw new SmtpException("Failed to send password reset email.", ex);
                    }
                }
                else { return null; }
                return supplierToken.SupplierTokenId;
            }

            return Guid.NewGuid();
        }

        public async Task<bool> VerifyToken(VerifyTokenRequest verifyTokenRequest)
        {
            Supplier? supplier = await _context.Suppliers.FindAsync(verifyTokenRequest.Id);
            if (supplier is not null)
            {
                SupplierToken? supplierToken = await _context.SupplierTokens.FindAsync(verifyTokenRequest.TokenId);
                if (supplierToken is not null
                    && !supplierToken.IsDeleted
                    && supplierToken.SupplierId == verifyTokenRequest.Id
                    && CryptographicOperations.FixedTimeEquals(
                        Convert.FromBase64String(Hash(verifyTokenRequest.Token, supplierToken.Salt)),
                        Convert.FromBase64String(supplierToken.Token)
                    )
                    && supplierToken.ExpireTime >= DateTime.UtcNow)
                {
                    supplierToken.IsDeleted = true;
                    _context.SupplierTokens.Update(supplierToken);
                    await _context.SaveChangesAsync();
                    return true;
                }
            }
            return false;
        }
    }
}
