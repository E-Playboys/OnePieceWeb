using System;
using OnePiece.Web.DataAccess.Entities;

namespace OnePiece.Web.Entities
{
    public class Tracking : EntityBase
    {
        public Tracking()
        {
            CreatedDate = DateTime.Now;
        }

        public string CreatedUserId { get; set; }
        public User CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
