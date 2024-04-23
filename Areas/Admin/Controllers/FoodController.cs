using Microsoft.AspNetCore.Mvc;

namespace NET_290_291_T35.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("food")]
    public class FoodController : Controller
    {
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
