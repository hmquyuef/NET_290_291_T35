$(document).ready(() => {
    LoadData();
});

$('#addFood').click(() => {
    const tensanpham = $('#tensanpham').val();
    const giaca = $('#giaca').val();
    const danhgia = $('#danhgia').val();
    const mota = $('#mota').val();
    console.log(tensanpham, giaca, danhgia, mota);
    //call ajax to foodcontroller method post
    $.ajax({
        url: '/food/add',
        type: 'POST',
        data: {
            tensanpham: tensanpham,
            giaca: giaca,
            danhgia: danhgia,
            mota: mota
        },
        success: function (data) {
            if (data) {
                console.log("RESULT DATA: ", data)
                alert('Thêm sản phẩm thành công');
                $('#backDropModal').modal('hide');
            }
            else {
                alert('Thêm sản phẩm thất bại');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
});

function LoadData() {
    $('#listfood').empty();
    $.ajax({
        url: '/food/load-data',
        type: 'GET',
        success: function (data) {
            console.log("Danh sach du lieu: ", data);
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#listfood').append(`
								<tr>
									<td>${index + 1}</td>
                                    <td>${item.tenSanPham}</td>
									<td>${item.gia}</td>
									<td>${item.danhGia}</td>
									<td>
										<button type="button" class="btn btn-primary">Sửa</button>
										<button type="button" class="btn btn-danger" onclick="DeleteFood(${item.id})">Xóa</button>
									</td>
								</tr>
							`);
                });
            }
            else {
                $('#listfood').append(`
							<tr>
								<td colspan="5">Không có dữ liệu</td>
							</tr>
						`);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}