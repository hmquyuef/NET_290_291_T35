using System.ComponentModel.DataAnnotations;
using System.Drawing.Printing;

namespace NET_290_291_T35.Areas.Admin.Models.Categories
{
    public class Category
    {
        [Key]
        public Guid CategoryId { get; set; }
        public Guid ParentId { get; set; }
        public string? CategoryName { get; set; }
        public string? Description { get; set; }
        public string Position { get; set; }
        public bool IsActived { get; set; }
    }
}
