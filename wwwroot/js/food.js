$(document).ready(() => {
    renderTableFood();
    renderProductTypes();
});

function AddFood() {
    var id = $('#idFood').val();
    var tensanpham = $('#tensanpham').val();
    var giaca = $('#giaca').val();
    var danhmuc = $('#danhmuc').val();
    var hinhanh = $('#hinhanh').prop('files')[0];
    var mota = $('#mota').val();
    var kichhoat = $('#activefood').is(':checked');

    if (id === '') {
        var file = $('#hinhanh').prop('files')[0];
        var formData = new FormData();
        formData.append('file', file);
        $.ajax({
            url: '/food/upload',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    var addfood = { tensanpham: tensanpham, giaca: giaca, idProductType: danhmuc, hinhanh: data, mota: mota, kichhoat: kichhoat };
                    $.ajax({
                        url: '/food/add',
                        type: 'POST',
                        data: addfood,
                        success: function (data) {
                            if (data) {
                                $('#backDropModal').modal('hide');
                                renderTableFood();
                            }
                            else {
                                alert('Thêm sản phẩm thất bại');
                            }
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });

                }
                else {
                    alert('Upload ảnh thất bại');
                }
            },
            error: function (error) {
                console.log(error);
            }
        });

    }
}
function renderTableFood() {
    $('#listfood').empty();
    $.ajax({
        url: '/food/all',
        type: 'GET',
        success: function (data) {
            console.log("Danh sach du lieu: ", data);
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#listfood').append(`
								<tr>
									<td class="text-center">${index + 1}</td>
                                    <td>${item.tenSanPham}</td>
									<td>${item.gia}</td>
									<td id="productTypeName"></td>
									<td class="text-center">
										<button type="button" class="btn btn-primary" onclick="EditFood('${item.id}')">Sửa</button>
										<button type="button" class="btn btn-danger" onclick="DeleteFood('${item.id}')">Xóa</button>
									</td>
								</tr>
							`);
                    renderProductTypeName(item.productTypeId);
                });
            }
            else {
                $('#listfood').append(`
							<tr>
								<td class="text-center" colspan="5">Không có dữ liệu</td>
							</tr>
						`);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function renderProductTypes() {
    $('#danhmuc').empty();
    $.ajax({
        url: '/category/product-type/all',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#danhmuc').append(`
                                <option value="${item.id}">${item.name}</option>
                            `);
                });
            }
            else {
                $('#danhmuc').append(`
                            <option value="">Không có dữ liệu</option>
                        `);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function renderProductTypeName(id) {
    $.ajax({
        url: '/category/product-type/' + id,
        type: 'GET',
        success: function (data) {
            if (data) {
                $('#productTypeName').text(data.name);
            }
            else {
                $('#productTypeName').text('Không có dữ liệu');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
$('#hinhanh').change(function () {
    var hinhanh = $('#hinhanh').prop('files')[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        $('#uploadimage').attr('src', e.target.result);
    }
    reader.readAsDataURL(hinhanh);
    console.log(hinhanh)
});

function EditFood(id) {
    $.ajax({
        url: '/food/' + id,
        type: 'GET',
        success: function (data) {
            if (data) {
                $('#idFood').val(data.id);
                $('#tensanpham').val(data.tenSanPham);
                $('#giaca').val(data.gia);
                $('#danhmuc').val(data.productTypeId);
                $('#mota').val(data.moTa);
                $('#activefood').prop('checked', data.kichHoat);
                $('#backDropModal').modal('show');
            }
            else {
                alert('Không tìm thấy sản phẩm');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}