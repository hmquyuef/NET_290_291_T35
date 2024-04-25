using Microsoft.EntityFrameworkCore;
using NET_290_291_T35.Areas.Admin.Models.Fashions;
using NET_290_291_T35.Areas.Admin.Models.Foods;

namespace NET_290_291_T35.Areas.Admin.Data
{
    public class PetShopContext : DbContext
    {
        public PetShopContext() { }
        public PetShopContext(DbContextOptions<PetShopContext> options) : base(options) { }

        public DbSet<Food> Foods { get; set; }
        public DbSet<Fashion> Fashions { get; set; }
    }
}
