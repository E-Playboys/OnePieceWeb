using System.ComponentModel.DataAnnotations;

namespace OnePiece.Web.Services.Manga
{
    public class GetVolumeRq
    {
        [Required]
        public int? VolumeId { get; set; }
    }
}
