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
using OnePiece.Web.Services.Manga;

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
        [Route("ListVolumes")]
        public async Task<IActionResult> ListVolumes()
        {
            using (IUnitOfWork uow = _uowProvider.CreateUnitOfWork())
            {
                IEnumerable<MangaVolume> volumes;
                IRepository<MangaVolume> repository = uow.GetRepository<MangaVolume>();

                volumes = await repository.GetAllAsync();
                return new JsonResult(volumes);
            }
        }

        [HttpGet]
        [Route("ListChapters")]
        public async Task<IActionResult> ListChapters(ListMangaChaptersRq rq)
        {
            using (IUnitOfWork uow = _uowProvider.CreateUnitOfWork())
            {
                IEnumerable<MangaChapter> chapters;
                IRepository<MangaChapter> repository = uow.GetRepository<MangaChapter>();

                if (rq.VolumeId > 0)
                {
                    chapters = await repository.QueryPageAsync(rq.Skip, rq.Take, r => r.MangaVolumeId == rq.VolumeId, includes: q => q.Include(r => r.MangaImages));
                }
                else if (rq.Take > 0)
                {
                    chapters = await repository.QueryPageAsync(rq.Skip, rq.Take, null, includes: q => q.Include(r => r.MangaImages));
                }
                else
                {
                    chapters = await repository.GetAllAsync();
                }
                return new JsonResult(chapters);
            }
        }

        [HttpGet]
        [Route("GetVolume")]
        public async Task<IActionResult> GetVolume(GetVolumeRq rq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (IUnitOfWork uow = _uowProvider.CreateUnitOfWork())
            {
                IRepository<MangaVolume> repository = uow.GetRepository<MangaVolume>();

                var volume = await repository.GetAsync(rq.VolumeId.Value, q => q.Include(r => r.MangaChapters));

                return new JsonResult(volume);
            }
        }

        [HttpGet]
        [Route("GetChapter")]
        public async Task<IActionResult> GetChapter(GetChapterRq rq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (IUnitOfWork uow = _uowProvider.CreateUnitOfWork())
            {
                IRepository<MangaChapter> repository = uow.GetRepository<MangaChapter>();

                var rs = new GetChapterRs();
                rs.Chapter = await repository.GetAsync(rq.ChapterId.Value, q => q.Include(r => r.MangaImages));

                var nextChapter = await repository.QueryOneAsync(r => r.Id > rs.Chapter.Id);
                rs.NextChapterId = nextChapter != null ? (int?)nextChapter.Id : null;

                var prevChapter = await repository.QueryOneAsync(r => r.Id < rs.Chapter.Id, r => r.OrderByDescending(r1 => r1.Id));
                rs.PrevChapterId = prevChapter != null ? (int?)prevChapter.Id : null;

                return new JsonResult(rs);
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
