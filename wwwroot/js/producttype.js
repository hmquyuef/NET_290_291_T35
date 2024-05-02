$(document).ready(() => {
    renderTableProductTypes();
});

function renderTableProductTypes() {
    $('#listproducttypes').empty();
    $.ajax({
        url: '/category/product-type/all',
        type: 'GET',
        success: function (data) {
            console.log("Product Types: ", data);
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#listproducttypes').append(`
								<tr>
									<td class="text-center">${index + 1}</td>
                                    <td>${item.name}</td>
									<td class="text-center">${item.position}</td>
									<td class="text-center ${item.isActive ? 'text-primary' : 'text-danger'}">${item.isActive ? "Kích hoạt" : "Không kích hoạt"}</td>
									<td>${item.description}</td>
                                    <td class="text-center">
										<button type="button" class="btn btn-primary" onclick="EditProductType('${item.id}')">Sửa</button>
										<button type="button" class="btn btn-danger" onclick="DeleteProductType('${item.id}')">Xóa</button>
									</td>
								</tr>
							`);
                });
            }
            else {
                $('#listproducttypes').append(`
							<tr>
								<td class="text-center" colspan="6">Không có dữ liệu</td>
							</tr>
						`);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function AddProductType() {
    var id = $('#idProductType').val();
    var tenloai = $('#tenloai').val();
    var vitri = $('#vitri').val();
    var mota = $('#mota').val();
    var kichhoat = $('#kichhoat').is(':checked');
    var adddata = {
        tenloai: tenloai,
        vitri: vitri,
        mota: mota,
        kichhoat: kichhoat
    };
    if (id === '') {
        $.ajax({
            url: '/category/product-type/add',
            type: 'POST',
            data: adddata,
            success: function (result) {
                if (result) {
                    $('#productTypeTitle').html('Cập nhật loại sản phẩm');
                    $('#tenloai').val('');
                    $('#vitri').val('');
                    $('#mota').val('');
                    $('#kichhoat').prop('checked', false);
                    $('#productTypeModal').modal('hide');
                    renderTableProductTypes();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    else {
        var editdata = {id: id, tenloai: tenloai, vitri: vitri, mota: mota, kichhoat: kichhoat}
        $.ajax({
            url: '/category/product-type/edit',
            type: 'PUT',
            data: editdata,
            success: function (result) {
                if (result) {
                    $('#productTypeTitle').html('Khai báo thông tin loại sản phẩm');
                    $('#tenloai').val('');
                    $('#vitri').val('');
                    $('#mota').val('');
                    $('#kichhoat').prop('checked', false);
                    $('#productTypeModal').modal('hide');
                    renderTableProductTypes();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}

function EditProductType(id) {
    $.ajax({
        url: '/category/product-type/' + id,
        type: 'GET',
        success: function (data) {
            if (data) {
                $('#idProductType').val(data.id);
                $('#tenloai').val(data.name);
                $('#vitri').val(data.position);
                $('#mota').val(data.description);
                $('#kichhoat').prop('checked', data.isActive);
                $('#productTypeModal').modal('show');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function DeleteProductType(id) {
    $.ajax({
        url: '/category/product-type/delete/' + id,
        type: 'DELETE',
        success: function (result) {
            if (result) {
                renderTableProductTypes();
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}