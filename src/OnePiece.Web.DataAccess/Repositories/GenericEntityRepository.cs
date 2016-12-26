using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OnePiece.Web.DataAccess.Entities;

namespace OnePiece.Web.DataAccess.Repositories
{
    public class GenericEntityRepository<TEntity> : EntityRepositoryBase<DbContext, TEntity> where TEntity : EntityBase, new()
    {
		public GenericEntityRepository(ILogger<DataAccess> logger) : base(logger, null)
		{ }
	}
}