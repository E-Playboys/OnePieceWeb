using System;
using System.Threading;
using System.Threading.Tasks;
using OnePiece.Web.DataAccess.Entities;
using OnePiece.Web.DataAccess.Repositories;

namespace OnePiece.Web.DataAccess
{
    public interface IUnitOfWork : IDisposable
    {
        int SaveChanges();
        Task<int> SaveChangesAsync();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);

        IRepository<TEntity> GetRepository<TEntity>();
        TRepository GetCustomRepository<TRepository>();
    }
}
