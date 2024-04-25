using System.ComponentModel.DataAnnotations;

namespace NET_290_291_T35.Areas.Admin.Models.Fashions
{
    public class Fashion
    {
        [Key]
        public Guid Id { get; set; }
        public string? TenSanPham { get; set; }
        public int Gia { get; set; }
        public int DanhGia { get; set; }
        public string? HinhAnh { get; set; }
        public string? MoTa { get; set; }
    }
}
