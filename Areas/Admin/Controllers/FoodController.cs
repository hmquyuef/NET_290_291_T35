using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NET_290_291_T35.Areas.Admin.Data;
using NET_290_291_T35.Areas.Admin.Models.Foods;

namespace NET_290_291_T35.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("food")]
    public class FoodController : Controller
    {
        private readonly PetShopContext _context;
        public FoodController(PetShopContext context)
        {
            _context = context;
        }

        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("load-data")]
        public async Task<IActionResult> LoadData()
        {
            var items = await _context.Foods.ToListAsync();
            return Ok(items);
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddFood(string tensanpham, int giaca, int danhgia, string mota)
        {
            var food = new Food
            {
                Id = Guid.NewGuid(),
                TenSanPham = tensanpham,
                Gia = giaca,
                DanhGia = danhgia,
                MoTa = mota
            };
            _context.Add(food);
            await _context.SaveChangesAsync();
            return Ok(food);
            //return RedirectToAction("Index", new {Areas = "Admin"});
        }
    }
}
