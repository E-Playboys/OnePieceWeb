using Microsoft.EntityFrameworkCore;

namespace OnePiece.Web.DataAccess.Repositories
{
    public interface IRepositoryInjection
    {
        IRepositoryInjection SetContext(DbContext context);
    }
}