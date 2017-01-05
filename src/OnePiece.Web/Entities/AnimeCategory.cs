using System.Collections.Generic;
using OnePiece.Web.DataAccess.Entities;

namespace OnePiece.Web.Entities
{
    public class AnimeCategory : Tracking
    {
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }

        public List<AnimeSeason> AnimeSeasons { get; set; }
    }
}
