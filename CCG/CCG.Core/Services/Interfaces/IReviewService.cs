using CCG.Core.Models.DTOs.Request;
using CCG.Core.Models.DTOs.Response;

namespace CCG.Core.Services.Interfaces
{
    public interface IReviewService
    {
        Task<ReviewResponse?> AddReviewAsync(AddReviewRequest addReviewRequest);
        Task<bool> DeleteReviewAsync(Guid userId, Guid productId);
        Task<List<ReviewResponse>> GetReviewsAsync();
        Task<(List<ReviewResponse> reviews, double averageRating)> GetReviewsByProductIdAsync(Guid productId);
        Task<bool> UpdateReviewAsync(Guid userId, Guid productId, UpdateReviewRequest updateReviewRequest);
    }
}