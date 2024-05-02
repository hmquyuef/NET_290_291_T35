namespace NET_290_291_T35.Areas.Admin.Models.ProductTypes
{
    public class ProductType
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Position { get; set; }
        public bool IsActive { get; set; }
    }
}
