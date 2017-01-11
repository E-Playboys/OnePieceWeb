using System;
using System.Collections.Generic;
using OnePiece.Web.DataAccess.Entities;

namespace OnePiece.Web.Entities
{
    public class AnimeEpisode : Tracking
    {
        public string Name { get; set; }
        public string Avatar { get; set; }
        public int Number { get; set; }
        public string Description { get; set; }
        public DateTime? PublishedDate { get; set; }

        public List<AnimeVideo> AnimeVideos { get; set; }
        public int AnimeSeasonId { get; set; }
        public AnimeSeason AnimeSeason { get; set; }
    }
}
