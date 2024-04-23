using Microsoft.AspNetCore.Mvc;

namespace NET_290_291_T35.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("category")]
    public class CategoryController : Controller
    {
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("product")]
        public IActionResult Product()
        {
            return View();
        }

        [Route("post")]
        public IActionResult Post()
        {
            return View();
        }
    }
}
