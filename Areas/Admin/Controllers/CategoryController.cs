using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NET_290_291_T35.Areas.Admin.Data;
using NET_290_291_T35.Areas.Admin.Models.ProductTypes;

namespace NET_290_291_T35.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("category")]
    public class CategoryController : Controller
    {
        private readonly PetShopContext _context;
        public CategoryController(PetShopContext context)
        {
            _context = context;
        }   

        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        #region ProductTypes
        [Route("product-type")]
        public IActionResult ProductType()
        {
            return View();
        }

        [Route("product-type/all")]
        public async Task<IActionResult> ProductTypeAll()
        {
            var items = await _context.ProductTypes.OrderBy(x => x.Position).ThenBy(x => x.Name).ToListAsync();
            return Ok(items);
        }
        [Route("product-type/{id}")]
        public async Task<IActionResult> ProductTypeDetail(Guid id)
        {
            var item = await _context.ProductTypes.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("product-type/add")]
        public async Task<IActionResult> ProductTypeAdd(string tenloai, int vitri, string mota, bool kichhoat)
        {
            var item = new ProductType
            {
                Id = Guid.NewGuid(),
                Name = tenloai,
                Position = vitri,
                Description = mota,
                IsActive = kichhoat
            };
            _context.ProductTypes.Add(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
        [HttpPut]
        [Route("product-type/edit")]
        public async Task<IActionResult> ProductTypeEdit(Guid id, string tenloai, int vitri, string mota, bool kichhoat)
        {
            var item = await _context.ProductTypes.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            item.Name = tenloai;
            item.Position = vitri;
            item.Description = mota;
            item.IsActive = kichhoat;
            await _context.SaveChangesAsync();
            return Ok(item);
        }
        [HttpDelete]
        [Route("product-type/delete/{id}")]
        public async Task<IActionResult> ProductTypeDelete(Guid id)
        {
            var item = await _context.ProductTypes.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            _context.ProductTypes.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
        #endregion

        [Route("post")]
        public IActionResult Post()
        {
            return View();
        }
    }
}
