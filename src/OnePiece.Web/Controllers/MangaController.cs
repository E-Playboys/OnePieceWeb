using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnePiece.Web.Data;
using Microsoft.Extensions.Logging;
using OnePiece.Web.Services;
using Newtonsoft.Json;
using OnePiece.Web.Entities;
using OnePiece.Web.DataAccess;
using OnePiece.Web.DataAccess.Repositories;
using OnePiece.Web.DataAccess.Uow;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OnePiece.Web.Controllers
{
    [Route("api/[controller]")]
    public class MangaController : Controller
    {

        private IUowProvider _uowProvider;
        private readonly ILogger _logger;

        public MangaController(IUowProvider uowProvider)
        {
            _uowProvider = uowProvider;
        }

        [HttpGet]
        [Route("GetAllVoumes")]
        public async Task<IActionResult> GetAllVoumes()
        {
            using (IUnitOfWork uow = _uowProvider.CreateUnitOfWork())
            {
                IEnumerable<MangaVolume> volumes;
                IRepository<MangaVolume> repository = uow.GetRepository<MangaVolume>();

                volumes = await repository.GetAllAsync();
                return new JsonResult(volumes);
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
