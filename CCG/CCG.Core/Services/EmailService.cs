using CCG.Core.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;

namespace CCG.Core.Services
{
    public class EmailService(IConfiguration configuration) : IEmailService
    {
        private readonly IConfiguration _configuration = configuration;

        private async Task SendEmailAsync(string toEmail, string subject, string body, List<(MemoryStream data, string filename)>? files)
        {
            string? host = _configuration["EmailSettings:SmtpServer"];
            int port = int.Parse(_configuration["EmailSettings:SmtpPort"]!);
            string? senderEmail = _configuration["EmailSettings:SenderEmail"];
            string? senderPassword = _configuration["EmailSettings:SenderPassword"];
            string? senderName = _configuration["EmailSettings:SenderName"];

            using MailMessage message = new();
            message.From = new MailAddress(senderEmail!, senderName);
            message.To.Add(toEmail);
            message.Subject = subject;
            message.Body = body;
            message.IsBodyHtml = true;

            if (files is not null && files.Count > 0)
            {
                foreach (var (data, filename) in files)
                {
                    data.Position = 0;
                    message.Attachments.Add(new Attachment(data, filename));
                }
            }

            using SmtpClient client = new(host, port);
            client.Credentials = new NetworkCredential(senderEmail, senderPassword);
            client.EnableSsl = true;

            await client.SendMailAsync(message);
        }

        public async Task SendPasswordResetEmailAsync(string toEmail, string token)
        {
            string subject = "Password Reset Request";
            string body = $"Here is your token to reset your password: {token}. The token will expire in 5 minutes";
            await SendEmailAsync(toEmail, subject, body, null);
        }

        public async Task SendAuthenticationEmailAsync(string toEmail, string token)
        {
            string subject = "Password Reset Request";
            string body = $"Here is your token to verify your identification: {token}. The token will expire in 5 minutes";
            await SendEmailAsync(toEmail, subject, body, null);
        }

        public async Task SendWelcomeEmailAsync(string toEmail, string displayName)
        {
            string subject = "Welcome to CCG!";
            string body = $"Hello {displayName}, welcome to CCG! We're glad to have you on board.";
            await SendEmailAsync(toEmail, subject, body, null);
        }
    }
}
