using System.Collections.Generic;
using OnePiece.Web.Entities.Enums;

namespace OnePiece.Web.Entities
{
    public class AnimeVideo : Tracking
    {
        public string Name { get; set; }
        public int Number { get; set; }
        public string Description { get; set; }
        public string Poster { get; set; }
        public string AlternativeLink { get; set; }
        public string AspectRatio { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public VideoQuality VideoQuality { get; set; }

        public List<VideoLink> VideoLinks { get; set; }
        public int AnimeEpisodeId { get; set; }
        public AnimeEpisode AnimeEpisode { get; set; }
    }
}
