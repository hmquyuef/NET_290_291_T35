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

        [Route("all")]
        public async Task<IActionResult> LoadData()
        {
            var items = await _context.Foods.ToListAsync();
            return Ok(items);
        }

        [Route("{id}")]
        public async Task<IActionResult> Detail(Guid id)
        {
            var item = await _context.Foods.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddFood(string tensanpham, int giaca, string hinhanh, string idProductType, string mota, bool kichhoat)
        {
            var food = new Food
            {
                Id = Guid.NewGuid(),
                TenSanPham = tensanpham,
                Gia = giaca,
                DanhGia = 0,
                MoTa = mota,
                HinhAnh = hinhanh,
                ProductTypeId = Guid.Parse(idProductType),
                IsActived = kichhoat
            };
            _context.Add(food);
            await _context.SaveChangesAsync();
            return Ok(food);
            //return RedirectToAction("Index", new {Areas = "Admin"});
        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> EditFood(Guid id, string tensanpham, int giaca, Guid idProductType, string mota, bool kichhoat)
        {
            var food = await _context.Foods.FirstOrDefaultAsync(x => x.Id == id);
            if (food == null)
            {
                return NotFound();
            }
            var productType = await _context.ProductTypes.FirstOrDefaultAsync(x => x.Id == idProductType);
            food.TenSanPham = tensanpham;
            food.Gia = giaca;
            food.MoTa = mota;
            food.ProductTypeId = productType.Id;
            food.IsActived = kichhoat;
            await _context.SaveChangesAsync();
            return Ok(food);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteFood(Guid id)
        {
            var food = await _context.Foods.FirstOrDefaultAsync(x => x.Id == id);
            if (food == null)
            {
                return NotFound();
            }
            _context.Foods.Remove(food);
            await _context.SaveChangesAsync();
            return Ok(food);
        }

        //viết hàm xử lý upload hình ảnh
        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return Content("file not selected");
            }
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", Guid.NewGuid().ToString() + "-" + file.FileName);
            var path = Path.Combine("images", file.FileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return Ok(path);
        }
    }
}
