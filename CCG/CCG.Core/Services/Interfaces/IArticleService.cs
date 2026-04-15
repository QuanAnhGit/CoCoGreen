using CCG.Core.Models.DTOs.Request;
using CCG.Core.Models.DTOs.Response;

namespace CCG.Core.Services.Interfaces
{
    public interface IArticleService
    {
        Task<ArticleResponse?> AddArticleAsync(AddArticleRequest addArticleRequest);
        Task<bool> DeleteArticleAsync(string articleId);
        Task<ArticleResponse?> GetArticleByIdAsync(string articleId);
        Task<List<ArticleResponse>> GetArticlesAsync();
        Task IncreaseViewCountAsync(string articleId);
        Task<bool> UpdateArticleAsync(string articleId, UpdateArticleRequest updateArticleRequest);
    }
}