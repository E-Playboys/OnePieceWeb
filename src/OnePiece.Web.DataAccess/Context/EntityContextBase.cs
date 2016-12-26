using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnePiece.Web.DataAccess.Entities;

namespace OnePiece.Web.DataAccess.Context
{
    public class EntityContextBase<TContext> : IdentityDbContext<User>, IEntityContext where TContext : DbContext
    {
        public EntityContextBase(DbContextOptions<TContext> options) : base(options)
        {
        }
    }
}
