using System;
using OnePiece.Web.Entities.Enums;

namespace OnePiece.Web.Entities
{
    public class MusicVideo : Tracking
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public string AlternativeLink { get; set; }
        public string AspectRatio { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public VideoQuality VideoQuality { get; set; }
        public DateTime? PublishedDate { get; set; }
    }
}
