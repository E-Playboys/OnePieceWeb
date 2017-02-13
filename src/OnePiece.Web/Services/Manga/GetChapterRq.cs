using System.ComponentModel.DataAnnotations;

namespace OnePiece.Web.Services.Manga
{
    public class GetChapterRq
    {
        [Required]
        public int? ChapterId { get; set; }
    }
}
