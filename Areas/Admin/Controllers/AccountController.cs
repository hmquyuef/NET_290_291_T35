using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using NET_290_291_T35.Areas.Identity.Data;
using System.Text.Encodings.Web;
using System.Text;
using NET_290_291_T35.Areas.Admin.Data;
using NET_290_291_T35.Data;
using Microsoft.EntityFrameworkCore;

namespace NET_290_291_T35.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("account")]
    public class AccountController : Controller
    {
        private readonly UserManager<PetShopUser> _userManager;
        private readonly IUserStore<PetShopUser> _userStore;
        private readonly PetShopIdentityContext _context;
        public AccountController(UserManager<PetShopUser> userManager, IUserStore<PetShopUser> userStore, PetShopIdentityContext context)
        {
            _userManager = userManager;
            _userStore = userStore;
            _context = context;
        }

        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("all")]
        public async Task<IActionResult> GetAllAccount()
        {
            var items = await _context.Users.ToListAsync();
            return Ok(items);
        }

        [Route("create")]
        [HttpPost]
        public async Task<IActionResult> CreateAccount(string username, string email, string password)
        {
            // Create account
            var user = CreateUser();
            user.UserName = username;
            user.EmailConfirmed = true;
            user.Email = email;
            user.NormalizedEmail = email.ToUpper();
            user.NormalizedUserName = username.ToUpper();

            await _userStore.SetUserNameAsync(user, email, CancellationToken.None);
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                return Ok(user);
            }
            return BadRequest(result.Errors);
        }

        private PetShopUser CreateUser()
        {
            try
            {
                return Activator.CreateInstance<PetShopUser>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(PetShopUser)}'. " +
                    $"Ensure that '{nameof(PetShopUser)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }
    }
}
