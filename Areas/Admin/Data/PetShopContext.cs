using Microsoft.EntityFrameworkCore;

namespace NET_290_291_T35.Areas.Admin.Data
{
    public class PetShopContext : DbContext
    {
        public PetShopContext() { }
        public PetShopContext(DbContextOptions<PetShopContext> options) : base(options) { }

    }
}
