using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NET_290_291_T35.Areas.Identity.Data;

namespace NET_290_291_T35.Data;

public class PetShopIdentityContext : IdentityDbContext<PetShopUser>
{
    public PetShopIdentityContext(DbContextOptions<PetShopIdentityContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}
