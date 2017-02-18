using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OnePiece.Web.DataAccess;
using OnePiece.Web.DataAccess.Repositories;
using OnePiece.Web.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OnePiece.Web.Controllers
{
    [Route("api/[controller]")]
    public class AnimeController : Controller
    {

        private IUowProvider _uowProvider;
        //private readonly ILogger _logger;

        public AnimeController(IUowProvider uowProvider)
        {
            _uowProvider = uowProvider;
        }

        [HttpGet]
        [Route("GetAllSeasons")]
        public async Task<IActionResult> GetAllSeasons()
        {
            using (IUnitOfWork uow = _uowProvider.CreateUnitOfWork())
            {
                IEnumerable<AnimeSeason> seasons;
                IRepository<AnimeSeason> repository = uow.GetRepository<AnimeSeason>();

                seasons = await repository.GetAllAsync();
                return new JsonResult(seasons);
            }
        }

        [HttpGet]
        [Route("GetSeason")]
        public async Task<IActionResult> GetSeason(int id)
        {
            using (IUnitOfWork uow = _uowProvider.CreateUnitOfWork())
            {
                AnimeSeason season;
                IRepository<AnimeSeason> repository = uow.GetRepository<AnimeSeason>();

                season = await repository.GetAsync(id);
                return new JsonResult(season);
            }
        }

        [HttpGet]
        [Route("GetEposide")]
        public async Task<IActionResult> GetEposide(int id)
        {
            using (IUnitOfWork uow = _uowProvider.CreateUnitOfWork())
            {
                AnimeEpisode eposide;
                IRepository <AnimeEpisode> repository = uow.GetRepository<AnimeEpisode>();

                eposide = await repository.GetAsync(id);
                return new JsonResult(eposide);
            }
        }

        [HttpGet]
        [Route("Search")]
        public async Task<IActionResult> Search(string searchText)
        {
            using (IUnitOfWork uow = _uowProvider.CreateUnitOfWork())
            {
                IEnumerable<AnimeEpisode> eposides;
                IRepository<AnimeEpisode> repository = uow.GetRepository<AnimeEpisode>();

                eposides = await repository.QueryAsync(e => e.Name.Contains(searchText) || e.Number.ToString().Contains(searchText) || e.Description.Contains(searchText));
                return new JsonResult(eposides);
            }
        }
    }
}
