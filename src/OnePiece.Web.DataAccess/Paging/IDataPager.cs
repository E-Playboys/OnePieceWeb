using OnePiece.Web.DataAccess.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;
using OnePiece.Web.DataAccess.Query;

namespace OnePiece.Web.DataAccess.Paging
{
    public interface IDataPager<TEntity>
    {
        DataPage<TEntity> Get(int pageNumber, int pageLength, OrderBy<TEntity> orderby = null, Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null);
        DataPage<TEntity> Query(int pageNumber, int pageLength, Filter<TEntity> filter, OrderBy<TEntity> orderby = null, Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null);

        Task<DataPage<TEntity>> GetAsync(int pageNumber, int pageLength, OrderBy<TEntity> orderby = null, Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null);
        Task<DataPage<TEntity>> QueryAsync(int pageNumber, int pageLength, Filter<TEntity> filter, OrderBy<TEntity> orderby = null, Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null);
    }
}
