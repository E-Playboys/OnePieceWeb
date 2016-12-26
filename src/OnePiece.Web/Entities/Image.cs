using OnePiece.Web.Entities.Enums;

namespace OnePiece.Web.Entities
{
    public class Image : Tracking
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public string AlternativeLink { get; set; }
        public string GifLink { get; set; }
        public string AlternativeGifLink { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public ImageType ImageType { get; set; }
    }
}
