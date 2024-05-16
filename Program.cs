using Microsoft.EntityFrameworkCore;
using NET_290_291_T35.Areas.Admin.Data;
using NET_290_291_T35.Data;
using NET_290_291_T35.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;
using NET_290_291_T35;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<PetShopContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddDbContext<PetShopIdentityContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("IdentityContextConnection")));

builder.Services.AddDefaultIdentity<PetShopUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<PetShopIdentityContext>();

builder.Services.AddControllersWithViews();

builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();

app.Run();
