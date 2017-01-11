using OnePiece.Web.Data;
using OnePiece.Web.DataAccess.Repositories;
using OnePiece.Web.Entities;
using Microsoft.Extensions.Logging;

namespace OnePiece.Web.Services
{
    public class MangaRepository : EntityRepositoryBase<ApplicationDbContext, Manga>, IMangaRepository
    {
        public MangaRepository(ILogger<DataAccess.DataAccess> logger, ApplicationDbContext context) 
            : base(logger, context)
        {
        }
    }
}
