using System.Collections.Generic;
using OnePiece.Web.DataAccess.Entities;
using System;

namespace OnePiece.Web.Entities
{
    public class MangaVolume : Tracking
    {
        public string Name { get; set; }
        public string Avatar { get; set; }
        public int Number { get; set; }
        public string Description { get; set; }
        public DateTime? PublishedDate { get; set; }

        public List<MangaChapter> MangaChapters { get; set; }
    }
}