using System.Collections.Generic;
using OnePiece.Web.DataAccess.Entities;

namespace OnePiece.Web.Entities
{
    public class ArticleCategory : EntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }

        public List<Article> Articles { get; set; }
    }
}
