using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using OnePiece.Web.Data;
using OnePiece.Web.Entities.Enums;

namespace OnePiece.Web.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("OnePiece.Web.DataAccess.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.Anime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AlternativeLink");

                    b.Property<int>("AnimeEpisodeId");

                    b.Property<string>("AspectRatio");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("CreatedUserId");

                    b.Property<string>("Description");

                    b.Property<int>("Height");

                    b.Property<string>("Link");

                    b.Property<string>("Name");

                    b.Property<int>("Number");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<int>("VideoQuality");

                    b.Property<int>("Width");

                    b.HasKey("Id");

                    b.HasIndex("AnimeEpisodeId");

                    b.HasIndex("CreatedUserId");

                    b.ToTable("Animes");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.AnimeEpisode", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AnimeSeasonId");

                    b.Property<string>("Avatar");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int>("Number");

                    b.Property<DateTime?>("PublishedDate");

                    b.HasKey("Id");

                    b.HasIndex("AnimeSeasonId");

                    b.ToTable("AnimeEpisodes");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.AnimeSeason", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Avatar");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int>("Number");

                    b.HasKey("Id");

                    b.ToTable("AnimeSeasons");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ArticleCategoryId");

                    b.Property<string>("Avatar");

                    b.Property<string>("Content");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("CreatedUserId");

                    b.Property<string>("Description");

                    b.Property<bool>("IsActived");

                    b.Property<DateTime?>("PublishedDate");

                    b.Property<string>("Slug");

                    b.Property<string>("Title");

                    b.Property<DateTime?>("UpdatedDate");

                    b.HasKey("Id");

                    b.HasIndex("ArticleCategoryId");

                    b.HasIndex("CreatedUserId");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.ArticleCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int>("Priority");

                    b.HasKey("Id");

                    b.ToTable("ArticleCategories");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AlternativeGifLink");

                    b.Property<string>("AlternativeLink");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("CreatedUserId");

                    b.Property<string>("Description");

                    b.Property<string>("GifLink");

                    b.Property<int>("Height");

                    b.Property<int>("ImageType");

                    b.Property<string>("Link");

                    b.Property<string>("Name");

                    b.Property<int?>("NewsFeedId");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<int>("Width");

                    b.HasKey("Id");

                    b.HasIndex("CreatedUserId");

                    b.HasIndex("NewsFeedId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.Manga", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AlternativeGifLink");

                    b.Property<string>("AlternativeLink");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("CreatedUserId");

                    b.Property<string>("Description");

                    b.Property<string>("GifLink");

                    b.Property<int>("Height");

                    b.Property<string>("Link");

                    b.Property<int>("MangaChapterId");

                    b.Property<string>("Name");

                    b.Property<int>("Number");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<int>("Width");

                    b.HasKey("Id");

                    b.HasIndex("CreatedUserId");

                    b.HasIndex("MangaChapterId");

                    b.ToTable("Mangas");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.MangaChapter", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Avatar");

                    b.Property<string>("Description");

                    b.Property<int>("MangaSeasonId");

                    b.Property<string>("Name");

                    b.Property<int>("Number");

                    b.Property<DateTime?>("PublishedDate");

                    b.HasKey("Id");

                    b.HasIndex("MangaSeasonId");

                    b.ToTable("MangaChapters");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.MangaSeason", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Avatar");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int>("Number");

                    b.HasKey("Id");

                    b.ToTable("MangaSeasons");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.MusicVideo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AlternativeLink");

                    b.Property<string>("AspectRatio");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("CreatedUserId");

                    b.Property<string>("Description");

                    b.Property<int>("Height");

                    b.Property<string>("Link");

                    b.Property<string>("Name");

                    b.Property<DateTime?>("PublishedDate");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<int>("VideoQuality");

                    b.Property<int>("Width");

                    b.HasKey("Id");

                    b.HasIndex("CreatedUserId");

                    b.ToTable("MusicVideos");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.NewsFeed", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Avatar");

                    b.Property<string>("Description");

                    b.Property<bool>("IsActived");

                    b.Property<int?>("LinkToId");

                    b.Property<int>("LinkToTarget");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("NewsFeeds");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.Video", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AlternativeLink");

                    b.Property<string>("AspectRatio");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("CreatedUserId");

                    b.Property<string>("Description");

                    b.Property<int>("Height");

                    b.Property<string>("Link");

                    b.Property<string>("Name");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<int>("VideoQuality");

                    b.Property<int>("Width");

                    b.HasKey("Id");

                    b.HasIndex("CreatedUserId");

                    b.ToTable("Videos");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("OnePiece.Web.DataAccess.Entities.User")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("OnePiece.Web.DataAccess.Entities.User")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("OnePiece.Web.DataAccess.Entities.User")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("OnePiece.Web.Entities.Anime", b =>
                {
                    b.HasOne("OnePiece.Web.Entities.AnimeEpisode", "AnimeEpisode")
                        .WithMany("Animes")
                        .HasForeignKey("AnimeEpisodeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("OnePiece.Web.DataAccess.Entities.User", "CreatedUser")
                        .WithMany()
                        .HasForeignKey("CreatedUserId");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.AnimeEpisode", b =>
                {
                    b.HasOne("OnePiece.Web.Entities.AnimeSeason", "AnimeSeason")
                        .WithMany("AnimeEpisodes")
                        .HasForeignKey("AnimeSeasonId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("OnePiece.Web.Entities.Article", b =>
                {
                    b.HasOne("OnePiece.Web.Entities.ArticleCategory", "ArticleCategory")
                        .WithMany("Articles")
                        .HasForeignKey("ArticleCategoryId");

                    b.HasOne("OnePiece.Web.DataAccess.Entities.User", "CreatedUser")
                        .WithMany()
                        .HasForeignKey("CreatedUserId");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.Image", b =>
                {
                    b.HasOne("OnePiece.Web.DataAccess.Entities.User", "CreatedUser")
                        .WithMany()
                        .HasForeignKey("CreatedUserId");

                    b.HasOne("OnePiece.Web.Entities.NewsFeed")
                        .WithMany("Images")
                        .HasForeignKey("NewsFeedId");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.Manga", b =>
                {
                    b.HasOne("OnePiece.Web.DataAccess.Entities.User", "CreatedUser")
                        .WithMany()
                        .HasForeignKey("CreatedUserId");

                    b.HasOne("OnePiece.Web.Entities.MangaChapter", "MangaChapter")
                        .WithMany("Mangas")
                        .HasForeignKey("MangaChapterId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("OnePiece.Web.Entities.MangaChapter", b =>
                {
                    b.HasOne("OnePiece.Web.Entities.MangaSeason", "MangaSeason")
                        .WithMany("MangaChapters")
                        .HasForeignKey("MangaSeasonId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("OnePiece.Web.Entities.MusicVideo", b =>
                {
                    b.HasOne("OnePiece.Web.DataAccess.Entities.User", "CreatedUser")
                        .WithMany()
                        .HasForeignKey("CreatedUserId");
                });

            modelBuilder.Entity("OnePiece.Web.Entities.Video", b =>
                {
                    b.HasOne("OnePiece.Web.DataAccess.Entities.User", "CreatedUser")
                        .WithMany()
                        .HasForeignKey("CreatedUserId");
                });
        }
    }
}
