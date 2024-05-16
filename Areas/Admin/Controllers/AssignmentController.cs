using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NET_290_291_T35.Areas.Identity.Data;
using NET_290_291_T35.Data;

namespace NET_290_291_T35.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("assignment")]
    public class AssignmentController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<PetShopUser> _userManager;
        private readonly PetShopIdentityContext _context;
        public AssignmentController(RoleManager<IdentityRole> roleManager, 
                                    UserManager<PetShopUser> userManager,
                                    PetShopIdentityContext context)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
        }

        #region Roles
        [Route("roles")]
        public IActionResult Roles()
        {
            return View();
        }

        [Route("roles/all")]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            return Ok(roles);
        }

        [Route("roles/{id}")]
        public async Task<IActionResult> GetRoleById(Guid id)
        {
            var role = await _roleManager.FindByIdAsync(id.ToString());
            return Ok(role);
        }

        [Route("roles")]
        [HttpPost]
        public async Task<IActionResult> CreateRole(IdentityRole role)
        {
            role.NormalizedName = role.Name.ToUpper();
            var check = await _roleManager.FindByNameAsync(role.NormalizedName);
            if (check != null)
            {
                return BadRequest("Role already exists");
            }
            var result = await _roleManager.CreateAsync(role);
            return Ok(result);
        }

        [Route("roles/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateRole(Guid id, IdentityRole role)
        {
            role.Id = id.ToString();
            var result = await _roleManager.UpdateAsync(role);
            return Ok(result);
        }

        [Route("roles/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteRole(Guid id)
        {
            var role = await _roleManager.FindByIdAsync(id.ToString());
            var result = await _roleManager.DeleteAsync(role);
            return Ok(result);
        }
        #endregion

        #region Permissions
        [Route("permission")]
        public IActionResult Permission()
        {
            return View();
        }

        [Route("permission/all")]
        public async Task<IActionResult> GetAllPermissions()
        {
            var query = from ur in _context.UserRoles
                        join u in _context.Users on ur.UserId equals u.Id
                        join r in _context.Roles on ur.RoleId equals r.Id
                        select new
                        {
                            ur.UserId,
                            u.UserName,
                            u.Email,
                            ur.RoleId,
                            RoleName = r.Name
                        };
            var permissions = await query.ToListAsync();
            return Ok(permissions);
        }

        [Route("permission/create")]
        [HttpPost]
        public async Task<IActionResult> CreatePermission(string userId, string roleId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var roleName = _roleManager.FindByIdAsync(roleId).Result?.Name;
            if (roleName == "")
            {
                return BadRequest("Role not found");
            }
            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(result.Errors);
        }

        #endregion
    }
}
