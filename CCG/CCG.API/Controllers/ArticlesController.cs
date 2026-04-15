using CCG.Core.Models.DTOs.Request;
using CCG.Core.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CCG.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController(IArticleService articleService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetArticles()
        {
            var articles = await articleService.GetArticlesAsync();
            return Ok(articles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetArticleById(string id)
        {
            var article = await articleService.GetArticleByIdAsync(id);
            if (article == null)
            {
                return NotFound();
            }
            return Ok(article);
        }

        [HttpPost]
        public async Task<IActionResult> CreateArticle([FromBody] AddArticleRequest addArticleRequest)
        {
            var newArticle = await articleService.AddArticleAsync(addArticleRequest);

            if (newArticle is null)
            {
                return BadRequest("Failed to create article.");
            }

            return Ok(newArticle);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArticle(string id, [FromBody] UpdateArticleRequest updateArticleRequest)
        {
            var updatedArticle = await articleService.UpdateArticleAsync(id, updateArticleRequest);
            if (!updatedArticle)
            {
                return NotFound();
            }
            return Ok(updatedArticle);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(string id)
        {
            var deleted = await articleService.DeleteArticleAsync(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
