using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NET_290_291_T35.Areas.Admin.Data;
using NET_290_291_T35.Areas.Admin.Models.Categories;
using System.Security.Permissions;

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
        [Route("all")]
        public async Task<IActionResult> GetList()
        {
            try
            {
                var items = await _context.Categories.OrderBy(x => x.Position).ToListAsync();
                return Ok(items);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [Route("byid")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var item = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == id);
                if(item == null) return NotFound();
                return Ok(item);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message) ;
            }
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(Category category)
        {
            try
            {
                category.CategoryId = Guid.NewGuid();
                category.ParentId = category.ParentId == Guid.Empty ? category.CategoryId : category.ParentId;
                var positionParent = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == category.ParentId);
                category.Position = category.ParentId == Guid.Empty ? category.Position : positionParent.Position + "." + category.Position;
                _context.Categories.Add(category);
                await _context.SaveChangesAsync();
                return Ok(category);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> Update(Category category)
        {
            try
            {
                _context.Categories.Update(category);
                await _context.SaveChangesAsync();
                return Ok(category);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var item = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == id);
                if(item == null) return NotFound();
                _context.Categories.Remove(item);
                await _context.SaveChangesAsync();
                return StatusCode(202);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
