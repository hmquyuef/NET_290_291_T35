using NET_290_291_T35.Areas.Admin.Models.Categories;
using System.ComponentModel.DataAnnotations;

namespace NET_290_291_T35.Areas.Admin.Models.Products
{
    public class Product
    {
        [Key]
        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public int Price { get; set; }
        public int Votes { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        public Guid CategoryId { get; set; }
        public Category? Categorys { get; set; }
        public bool IsActived { get; set; }
    }
}
