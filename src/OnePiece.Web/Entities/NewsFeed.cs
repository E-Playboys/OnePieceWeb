using System.Collections.Generic;
using OnePiece.Web.DataAccess.Entities;
using OnePiece.Web.Entities.Enums;

namespace OnePiece.Web.Entities
{
    public class NewsFeed : Tracking
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Avatar { get; set; }
        public int? LinkToId { get; set; } 
        public LinkToTarget LinkToTarget { get; set; }
        public bool IsActived { get; set; }

        public List<Image> Images { get; set; }

    }
}
