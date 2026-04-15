using CCG.Core.Models;
using CCG.Core.Models.DTOs.Request;
using CCG.Core.Models.DTOs.Response;
using CCG.Core.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using NanoidDotNet;

namespace CCG.Core.Services
{
    public class ArticleService(CCGContext context) : IArticleService
    {
        private readonly CCGContext _context = context;

        internal static ArticleResponse MapArticle(Article article)
        {
            return new()
            {
                ArticleId = article.ArticleId,
                Title = article.Title,
                Context = article.Context,
                Image = article.Image,
                DateCreated = article.DateCreated,
                ViewCount = article.ViewCount,
            };
        }

        public async Task<List<ArticleResponse>> GetArticlesAsync()
        {
            List<Article> articles = await _context.Articles
                .AsNoTracking()
                .Where(a => !a.IsDeleted)
                .ToListAsync();

            return [.. articles.Select(MapArticle)];
        }

        public async Task<ArticleResponse?> GetArticleByIdAsync(string articleId)
        {
            Article? article = await _context.Articles
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.ArticleId == articleId && !a.IsDeleted);
            return article is not null ? MapArticle(article) : null;
        }

        public async Task<ArticleResponse?> AddArticleAsync(AddArticleRequest addArticleRequest)
        {
            string articleId = string.Empty;
            do
            {
                articleId = Nanoid.Generate(size: 10);
            }
            while (await _context.Articles.AnyAsync(a => a.ArticleId == articleId));
            Article article = new()
            {
                ArticleId = articleId,
                Title = addArticleRequest.Title,
                Context = addArticleRequest.Context,
                Image = addArticleRequest.Image,
                DateCreated = DateTime.UtcNow,
                ViewCount = 0,
                IsDeleted = false
            };
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();
            return MapArticle(article);
        }

        public async Task IncreaseViewCountAsync(string articleId)
        {
            await _context.Articles
                .Where(a => a.ArticleId == articleId && !a.IsDeleted)
                .ExecuteUpdateAsync(setters => setters
                .SetProperty(a => a.ViewCount, a => a.ViewCount + 1));
        }

        public async Task<bool> UpdateArticleAsync(string articleId, UpdateArticleRequest updateArticleRequest)
        {
            Article? article = await _context.Articles
                .FirstOrDefaultAsync(a => a.ArticleId == articleId && !a.IsDeleted);
            if (article is null)
            {
                return false;
            }
            if (updateArticleRequest.Title is not null)
                article.Title = updateArticleRequest.Title;
            if (updateArticleRequest.Context is not null)
                article.Context = updateArticleRequest.Context;
            if (updateArticleRequest.Image is not null)
                article.Image = updateArticleRequest.Image;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteArticleAsync(string articleId)
        {
            Article? article = await _context.Articles
                .FirstOrDefaultAsync(a => a.ArticleId == articleId && !a.IsDeleted);
            if (article is not null)
            {
                article.IsDeleted = true;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
