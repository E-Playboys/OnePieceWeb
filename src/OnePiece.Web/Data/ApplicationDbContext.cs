using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnePiece.Web.DataAccess.Context;
using OnePiece.Web.DataAccess.Entities;
using OnePiece.Web.Entities;
using OnePiece.Web.Models;

namespace OnePiece.Web.Data
{
    public class ApplicationDbContext : EntityContextBase<ApplicationDbContext>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<AnimeCategory> AnimeCategories { get; set; }
        public DbSet<AnimeVideo> AnimeVideos { get; set; }
        public DbSet<AnimeEpisode> AnimeEpisodes { get; set; }
        public DbSet<AnimeSeason> AnimeSeasons { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleCategory> ArticleCategories { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<MangaImage> MangaImages { get; set; }
        public DbSet<MangaChapter> MangaChapters { get; set; }
        public DbSet<MangaVolume> MangaSeasons { get; set; }
        public DbSet<MusicVideo> MusicVideos { get; set; }
        public DbSet<NewsFeed> NewsFeeds { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<VideoLink> VideoLinks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
