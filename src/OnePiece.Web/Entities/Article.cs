using System;
using OnePiece.Web.DataAccess.Entities;

namespace OnePiece.Web.Entities
{
    public class Article : Tracking
    {
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Avatar { get; set; }
        public DateTime? PublishedDate { get; set; }
        public bool IsActived { get; set; }

        public int? ArticleCategoryId { get; set; }
        public ArticleCategory ArticleCategory { get; set; }
    }
}
