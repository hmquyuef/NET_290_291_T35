using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NET_290_291_T35.Areas.Admin.Data;
using NET_290_291_T35.Areas.Admin.Models.Categories;
using NET_290_291_T35.Areas.Admin.Models.Products;
using NET_290_291_T35.Common;

namespace NET_290_291_T35.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("product")]
    public class ProductController : Controller
    {
        private readonly PetShopContext _context;
        public ProductController(PetShopContext context)
        {
            _context = context;
        }

        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("all")]
        public async Task<IActionResult> GetList()
        {
            try
            {
                var items = await _context.Products.Include(x => x.Categorys).OrderBy(x => x.ProductName).ToListAsync();
                return Ok(items);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [Route("byid/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var item = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == id);
                if (item == null) return NotFound();
                return Ok(item);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(Product product, IFormFile file, Guid categoryId)
        {
            try
            {
                if (file != null)
                {
                    product.Image = FilesManagement.UploadImage(file);
                }
                product.ProductId = Guid.NewGuid();
                product.Categorys = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == categoryId);
                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();
                return Ok(product);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update(Product product, IFormFile file, Guid categoryId)
        {
            try
            {
                var item = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == product.ProductId);
                if (item == null) return NotFound();
                if (file != null)
                {
                    item.Image = FilesManagement.UploadImage(file);
                }
                item.Categorys = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == categoryId);
                item.ProductName = product.ProductName;
                item.Price = product.Price;
                item.Description = product.Description;
                item.IsActived = product.IsActived;

                _context.Products.Update(item);
                await _context.SaveChangesAsync();
                return Ok(item);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete(List<Guid> ids)
        {
            try
            {
                foreach (var id in ids)
                {
                    var item = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == id);
                    if (item == null) return NotFound();
                    if (!string.IsNullOrEmpty(item.Image))
                    {
                        FilesManagement.RemoveImage(item.Image);
                    }
                    _context.Products.Remove(item);
                }
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
