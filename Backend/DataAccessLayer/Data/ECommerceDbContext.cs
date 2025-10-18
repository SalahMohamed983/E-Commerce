using System;
using System.Collections.Generic;
using DataAccessLayer.Entities;
using DtosLayer.Dtos;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data;

public partial class ECommerceDbContext : DbContext
{
    public ECommerceDbContext()
    {
    }

    public ECommerceDbContext(DbContextOptions<ECommerceDbContext> options)
        : base(options)
    {
    }
    public virtual DbSet<UserOrdersRaw> UserOrders { get; set; }

    // Mapping TVF
    public IQueryable<UserOrdersRaw> GetUserOrders(int UserId)
        => FromExpression(() => GetUserOrders(UserId));
    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<FavoritProduct> FavoritProducts { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrdersProduct> OrdersProducts { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ReviewAndRating> ReviewAndRatings { get; set; }

    public virtual DbSet<User> Users { get; set; }
       //"ConStr": "Server=db28612.public.databaseasp.net; Database=db28612; User Id=db28612; Password=i-4K7F@ro2G?; Encrypt=False; MultipleActiveResultSets=True"
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=db28612.public.databaseasp.net; Database=db28612; User Id=db28612; Password=i-4K7F@ro2G?; Encrypt=False; MultipleActiveResultSets=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Map TVF
        modelBuilder
            .HasDbFunction(typeof(ECommerceDbContext).GetMethod(nameof(GetUserOrders), new[] { typeof(int) }))
            .HasName("GetUserOrders")
            .HasSchema("dbo");
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Persons");

            entity.ToTable("Address");

            entity.Property(e => e.PhoneNum).HasMaxLength(20);
            entity.Property(e => e.Street).HasMaxLength(100);

            entity.HasOne(d => d.City).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Address_Cities");

            entity.HasOne(d => d.User).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_User_Address");
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.Property(e => e.BrandName).HasMaxLength(50);

            entity.HasOne(d => d.Category).WithMany(p => p.Brands)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Brands_Categories");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.Property(e => e.CategoryName).HasMaxLength(20);
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.Property(e => e.CityName).HasMaxLength(100);
        });

        modelBuilder.Entity<FavoritProduct>(entity =>
        {
            entity.HasOne(d => d.Product).WithMany(p => p.FavoritProducts)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_FavoritProducts_Products");

            entity.HasOne(d => d.User).WithMany(p => p.FavoritProducts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FavoritProducts_Users");
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.ToTable("Image");

            entity.Property(e => e.ImageUrl)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.Product).WithMany(p => p.Images)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_Image_Products");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Order");

            entity.ToTable(tb => tb.HasTrigger("trg_InsteadOfDeleteOrder"));

            entity.Property(e => e.OrderDateandTime).HasColumnType("datetime");

            entity.HasOne(d => d.Address).WithMany(p => p.Orders)
                .HasForeignKey(d => d.AddressId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Orders_Address");

            entity.HasOne(d => d.Payment).WithMany(p => p.Orders)
                .HasForeignKey(d => d.PaymentId)
                .HasConstraintName("FK_Orders_Payments");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Orders_Users");
        });

        modelBuilder.Entity<OrdersProduct>(entity =>
        {
            entity.Property(e => e.PriceOfPice).HasColumnType("money");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");

            entity.HasOne(d => d.Order).WithMany(p => p.OrdersProducts)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrdersProducts_Orders");

            entity.HasOne(d => d.Product).WithMany(p => p.OrdersProducts)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_OrdersProducts_Products");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.Property(e => e.DateOfExpiretion).HasColumnType("datetime");
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);
            entity.Property(e => e.NameOnCard).HasMaxLength(20);
            entity.Property(e => e.NumOfCrad)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.ThirdNum).HasColumnName("thirdNum");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Payments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Payments_Users");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.BrandId).HasColumnName("BrandID");
            entity.Property(e => e.Name).HasMaxLength(250);
            entity.Property(e => e.Price).HasColumnType("smallmoney");

            entity.HasOne(d => d.Brand).WithMany(p => p.Products)
                .HasForeignKey(d => d.BrandId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Products_Brands");
        });

        modelBuilder.Entity<ReviewAndRating>(entity =>
        {
            entity.ToTable("ReviewAndRating");

            entity.Property(e => e.DateTime).HasColumnType("datetime");

            entity.HasOne(d => d.Product).WithMany(p => p.ReviewAndRatings)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_ReviewAndRating_Products");

            entity.HasOne(d => d.User).WithMany(p => p.ReviewAndRatings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReviewAndRating_Users");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.AvterImage)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FullName).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
