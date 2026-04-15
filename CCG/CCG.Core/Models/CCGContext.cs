using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CCG.Core.Models;

public partial class CCGContext : DbContext
{
    public CCGContext()
    {
    }

    public CCGContext(DbContextOptions<CCGContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Article> Articles { get; set; }

    public virtual DbSet<CartItem> CartItems { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Receipt> Receipts { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Supplier> Suppliers { get; set; }

    public virtual DbSet<SupplierToken> SupplierTokens { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserToken> UserTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Article>(entity =>
        {
            entity.HasKey(e => e.ArticleId).HasName("articles_pkey");

            entity.ToTable("articles");

            entity.Property(e => e.ArticleId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("article_id");
            entity.Property(e => e.Context).HasColumnName("context");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("now()")
                .HasColumnName("date_created");
            entity.Property(e => e.Image).HasColumnName("image");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.ViewCount).HasColumnName("view_count");
        });

        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.ProductId }).HasName("cart_items_pkey");

            entity.ToTable("cart_items");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Amount)
                .HasDefaultValue(1)
                .HasColumnName("amount");
            entity.Property(e => e.DateAdded)
                .HasDefaultValueSql("now()")
                .HasColumnName("date_added");

            entity.HasOne(d => d.Product).WithMany(p => p.CartItems)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cart_items_product_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.CartItems)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cart_items_user_id_fkey");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("categories_pkey");

            entity.ToTable("categories");

            entity.Property(e => e.CategoryId)
                .ValueGeneratedOnAdd()
                .HasColumnName("category_id");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("orders_pkey");

            entity.ToTable("orders");

            entity.Property(e => e.OrderId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("order_id");
            entity.Property(e => e.Discount)
                .HasPrecision(12)
                .HasColumnName("discount");
            entity.Property(e => e.ReceiptId).HasColumnName("receipt_id");
            entity.Property(e => e.ShippingFee)
                .HasPrecision(12)
                .HasColumnName("shipping_fee");
            entity.Property(e => e.Status)
                .HasDefaultValue((short)3)
                .HasColumnName("status");
            entity.Property(e => e.SupplierId).HasColumnName("supplier_id");
            entity.Property(e => e.TrackingNumber).HasColumnName("tracking_number");

            entity.HasOne(d => d.Receipt).WithMany(p => p.Orders)
                .HasForeignKey(d => d.ReceiptId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("orders_receipt_id_fkey");

            entity.HasOne(d => d.Supplier).WithMany(p => p.Orders)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("orders_supplier_id_fkey");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => new { e.OrderId, e.ProductId }).HasName("order_items_pkey");

            entity.ToTable("order_items");

            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Amount)
                .HasDefaultValue(1)
                .HasColumnName("amount");
            entity.Property(e => e.PriceAtPurchase)
                .HasPrecision(12)
                .HasColumnName("price_at_purchase");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("order_items_order_id_fkey");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("order_items_product_id_fkey");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("products_pkey");

            entity.ToTable("products");

            entity.Property(e => e.ProductId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("product_id");
            entity.Property(e => e.Cat).HasColumnName("cat");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Discount)
                .HasPrecision(12)
                .HasColumnName("discount");
            entity.Property(e => e.Features).HasColumnName("features");
            entity.Property(e => e.Image).HasColumnName("image");
            entity.Property(e => e.InStock).HasColumnName("in_stock");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Price)
                .HasPrecision(12)
                .HasColumnName("price");
            entity.Property(e => e.Specs)
                .HasColumnType("jsonb")
                .HasColumnName("specs");
            entity.Property(e => e.SupplierId).HasColumnName("supplier_id");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("products_category_id_fkey");

            entity.HasOne(d => d.Supplier).WithMany(p => p.Products)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("products_supplier_id_fkey");
        });

        modelBuilder.Entity<Receipt>(entity =>
        {
            entity.HasKey(e => e.ReceiptId).HasName("receipts_pkey");

            entity.ToTable("receipts");

            entity.Property(e => e.ReceiptId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("receipt_id");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("now()")
                .HasColumnName("date_created");
            entity.Property(e => e.Discount)
                .HasPrecision(12)
                .HasColumnName("discount");
            entity.Property(e => e.IsHidden).HasColumnName("is_hidden");
            entity.Property(e => e.Total)
                .HasPrecision(12)
                .HasColumnName("total");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Receipts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("receipts_user_id_fkey");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.ProductId }).HasName("reviews_pkey");

            entity.ToTable("reviews");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Comment).HasColumnName("comment");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("now()")
                .HasColumnName("date_created");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.Rating).HasColumnName("rating");

            entity.HasOne(d => d.Product).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("reviews_product_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("reviews_user_id_fkey");
        });

        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.HasKey(e => e.SupplierId).HasName("suppliers_pkey");

            entity.HasIndex(e => e.Email, "uq_suppliers_email").IsUnique();

            entity.HasIndex(e => e.Username, "uq_suppliers_username").IsUnique();

            entity.HasIndex(e => e.NormalizedUsername, "uq_suppliers_normalized_username").IsUnique();

            entity.ToTable("suppliers");

            entity.Property(e => e.SupplierId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("supplier_id");
            entity.Property(e => e.Address).HasColumnName("address");
            entity.Property(e => e.DisplayName).HasColumnName("display_name");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.NormalizedUsername).HasColumnName("normalized_username");
            entity.Property(e => e.Password).HasColumnName("password_hash");
            entity.Property(e => e.PhoneNumber).HasColumnName("phone_number");
            entity.Property(e => e.Region).HasColumnName("region");
            entity.Property(e => e.Salt).HasColumnName("salt");
            entity.Property(e => e.Username).HasColumnName("username");
        });

        modelBuilder.Entity<SupplierToken>(entity =>
        {
            entity.HasKey(e => e.SupplierTokenId).HasName("supplier_tokens_pkey");

            entity.ToTable("supplier_tokens");

            entity.Property(e => e.SupplierTokenId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("supplier_token_id");
            entity.Property(e => e.ExpireTime).HasColumnName("expire_time");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.Salt).HasColumnName("salt");
            entity.Property(e => e.SupplierId).HasColumnName("supplier_id");
            entity.Property(e => e.Token).HasColumnName("token");

            entity.HasOne(d => d.Supplier).WithMany(p => p.SupplierTokens)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("supplier_tokens_supplier_id_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("pk_users");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "uq_users_email").IsUnique();

            entity.HasIndex(e => e.Username, "uq_users_username").IsUnique();

            entity.HasIndex(e => e.NormalizedUsername, "uq_users_normalized_username").IsUnique();

            entity.Property(e => e.UserId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("user_id");
            entity.Property(e => e.Address).HasColumnName("address");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("now()")
                .HasColumnName("date_created");
            entity.Property(e => e.DisplayName).HasColumnName("display_name");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.NormalizedUsername).HasColumnName("normalized_username");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.PhoneNumber).HasColumnName("phone_number");
            entity.Property(e => e.Salt).HasColumnName("salt");
            entity.Property(e => e.Username).HasColumnName("username");

            entity.HasMany(d => d.Products).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserFavorite",
                    r => r.HasOne<Product>().WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("user_favorites_product_id_fkey"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("user_favorites_user_id_fkey"),
                    j =>
                    {
                        j.HasKey("UserId", "ProductId").HasName("user_favorites_pkey");
                        j.ToTable("user_favorites");
                        j.IndexerProperty<Guid>("UserId").HasColumnName("user_id");
                        j.IndexerProperty<Guid>("ProductId").HasColumnName("product_id");
                    });
        });

        modelBuilder.Entity<UserToken>(entity =>
        {
            entity.HasKey(e => e.UserTokenId).HasName("tokens_pkey");

            entity.ToTable("user_tokens");

            entity.Property(e => e.UserTokenId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("user_token_id");
            entity.Property(e => e.ExpireTime).HasColumnName("expire_time");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.Salt).HasColumnName("salt");
            entity.Property(e => e.Token).HasColumnName("token");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.UserTokens)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("user_tokens_user_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
