namespace CCG.Core.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendAuthenticationEmailAsync(string toEmail, string token);
        Task SendPasswordResetEmailAsync(string toEmail, string token);
        Task SendWelcomeEmailAsync(string toEmail, string displayName);
    }
}