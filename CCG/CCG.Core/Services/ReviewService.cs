using CCG.Core.Models;
using CCG.Core.Models.DTOs.Request;
using CCG.Core.Models.DTOs.Response;
using CCG.Core.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CCG.Core.Services
{
    public class ReviewService(CCGContext context) : IReviewService
    {
        private readonly CCGContext _context = context;

        internal static ReviewResponse MapReview(Review review)
        {
            return new()
            {
                UserId = review.UserId,
                ProductId = review.ProductId,
                Comment = review.Comment,
                Rating = review.Rating,
                DateCreated = review.DateCreated,
            };
        }

        public async Task<List<ReviewResponse>> GetReviewsAsync()
        {
            List<Review> reviews = await _context.Reviews
                .AsNoTracking()
                .Where(r => !r.IsDeleted)
                .Where(r => !r.User.IsDeleted)
                .Where(r => !r.Product.IsDeleted)
                .ToListAsync();
            return [.. reviews.Select(MapReview)];
        }

        public async Task<(List<ReviewResponse> reviews, double averageRating)> GetReviewsByProductIdAsync(Guid productId)
        {
            List<Review> reviews = await _context.Reviews
                .AsNoTracking()
                .Where(r => !r.IsDeleted)
                .Where(r => !r.User.IsDeleted)
                .Where(r => !r.Product.IsDeleted)
                .Where(r => r.ProductId == productId)
                .ToListAsync();
            double averageRating = reviews.Count > 0 ? reviews.Average(r => r.Rating) : 0;
            return ([.. reviews.Select(MapReview)], averageRating);
        }

        public async Task<ReviewResponse?> AddReviewAsync(AddReviewRequest addReviewRequest)
        {
            bool isValid = await _context.Users.AnyAsync(u => u.UserId == addReviewRequest.UserId && !u.IsDeleted)
                && await _context.Products.AnyAsync(p => p.ProductId == addReviewRequest.ProductId && !p.IsDeleted);

            if (!isValid) return null;

            Review? existingReview = await _context.Reviews.FindAsync(addReviewRequest.UserId, addReviewRequest.ProductId);
            if (existingReview is null)
            {
                Review review = new()
                {
                    UserId = addReviewRequest.UserId,
                    ProductId = addReviewRequest.ProductId,
                    Comment = addReviewRequest.Comment,
                    Rating = addReviewRequest.Rating,
                    DateCreated = DateTime.UtcNow,
                };

                _context.Reviews.Add(review);
                await _context.SaveChangesAsync();
                return MapReview(review);
            }
            else
            {
                if (!existingReview.IsDeleted)
                {
                    return null;
                }
                existingReview.Comment = addReviewRequest.Comment;
                existingReview.Rating = addReviewRequest.Rating;
                existingReview.DateCreated = DateTime.UtcNow;
                existingReview.IsDeleted = false;
                await _context.SaveChangesAsync();
                return MapReview(existingReview);
            }
        }

        public async Task<bool> UpdateReviewAsync(Guid userId, Guid productId, UpdateReviewRequest updateReviewRequest)
        {
            Review? review = await _context.Reviews.FindAsync(userId, productId);
            if (review is null || review.IsDeleted)
            {
                return false;
            }
            if (updateReviewRequest.Comment is not null)
                review.Comment = updateReviewRequest.Comment;
            if (updateReviewRequest.Rating is not null)
                review.Rating = (short)updateReviewRequest.Rating;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteReviewAsync(Guid userId, Guid productId)
        {
            Review? review = await _context.Reviews.FindAsync(userId, productId);
            if (review is null || review.IsDeleted)
            {
                return false;
            }
            review.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
