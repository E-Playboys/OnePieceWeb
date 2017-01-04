using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OnePiece.Web.Entities.Enums;

namespace OnePiece.Web.Entities
{
    public class VideoLink : Tracking
    {
        public string Url { get; set; }
        public string IsMainLink { get; set; }
        public VideoQuality VideoQuality { get; set; }
        public LinkType LinkType { get; set; }
        public string Note { get; set; }
    }
}
