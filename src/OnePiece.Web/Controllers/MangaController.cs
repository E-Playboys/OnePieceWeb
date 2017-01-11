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

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OnePiece.Web.Controllers
{
    [Route("api/[controller]")]
    public class MangaController : Controller
    {
        private readonly IMangaRepository _mangaRepo;
        private readonly ILogger _logger;

        public MangaController(IMangaRepository mangaRepo, ILoggerFactory loggerFactory)
        {
            _mangaRepo = mangaRepo;
            _logger = loggerFactory.CreateLogger<MangaController>();
        }

        [HttpGet]
        public async Task<string> Get()
        {
            List<Manga> allEp = await _mangaRepo.GetAllAsync();
            string result = await Task.Factory.StartNew(() => JsonConvert.SerializeObject(allEp));

            return result;
        }

        // GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

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
