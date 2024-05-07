using System.ComponentModel.DataAnnotations;

namespace NET_290_291_T35.Areas.Admin.Models.Categories
{
    public class Category
    {
        [Key]
        public Guid CategoryId { get; set; }
        public Guid ParentCategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? Description { get; set; }
        public int Position { get; set; }
        public bool IsActive { get; set; }
    }
}
