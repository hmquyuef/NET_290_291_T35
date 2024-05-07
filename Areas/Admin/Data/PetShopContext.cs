using Microsoft.EntityFrameworkCore;
using NET_290_291_T35.Areas.Admin.Models.Categories;
using NET_290_291_T35.Areas.Admin.Models.Products;

namespace NET_290_291_T35.Areas.Admin.Data
{
    public class PetShopContext : DbContext
    {
        public PetShopContext() { }
        public PetShopContext(DbContextOptions<PetShopContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
