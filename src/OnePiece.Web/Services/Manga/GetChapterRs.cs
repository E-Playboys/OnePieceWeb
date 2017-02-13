using OnePiece.Web.Entities;

namespace OnePiece.Web.Services.Manga
{
    public class GetChapterRs
    {
        public MangaChapter Chapter { get; set; }
        public int? NextChapterId { get; set; }
        public int? PrevChapterId { get; set; }
    }
}
