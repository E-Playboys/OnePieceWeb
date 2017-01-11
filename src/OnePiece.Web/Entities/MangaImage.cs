using System;

namespace OnePiece.Web.Entities
{
    public class MangaImage : Tracking
    {
        public string Name { get; set; }
        public int Number { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public string AlternativeLink { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        public int MangaChapterId { get; set; }
        public MangaChapter MangaChapter { get; set; }
    }
}
