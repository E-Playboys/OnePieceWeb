using System;
using OnePiece.Web.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace OnePiece.Web.DataAccess.Uow
{
    public class UnitOfWork : UnitOfWorkBase<DbContext>, IUnitOfWork
    {
        public UnitOfWork(DbContext context, IServiceProvider provider) : base(context, provider)
        { }
    }
}
