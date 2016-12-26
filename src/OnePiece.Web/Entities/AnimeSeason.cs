using System.Collections.Generic;
using OnePiece.Web.DataAccess.Entities;

namespace OnePiece.Web.Entities
{
    public class AnimeSeason : EntityBase
    {
        public string Name { get; set; }
        public string Avatar { get; set; }
        public int Number { get; set; }
        public string Description { get; set; }

        public List<AnimeEpisode> AnimeEpisodes { get; set; }
    }
}
