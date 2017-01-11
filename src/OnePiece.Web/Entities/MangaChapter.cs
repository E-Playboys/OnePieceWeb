using System;
using System.Collections.Generic;
using OnePiece.Web.DataAccess.Entities;

namespace OnePiece.Web.Entities
{
    public class MangaChapter : Tracking
    {
        public string Name { get; set; }
        public string Avatar { get; set; }
        public int Number { get; set; }
        public string Description { get; set; }
        public DateTime? PublishedDate { get; set; }

        public List<MangaImage> MangaImages { get; set; }
        public int MangaSeasonId { get; set; }
        public MangaSeason MangaSeason { get; set; }
    }
}
