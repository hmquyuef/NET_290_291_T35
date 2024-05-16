$(document).ready(() => {
    renderTableAccount();
});

function CreateUpdateAccount() {
    var id = $('#idAccount').val();
    var taikhoan = $('#taikhoan').val();
    var matkhau = $('#matkhau').val();
    var kichhoat = $('#kichhoat').is(':checked');

    if (id === '') {
        $.ajax({
            url: '/account/create',
            type: 'POST',
            data: {
                email: taikhoan,
                password: matkhau,
            },
            success: function (data) {
                if (data) {
                    toastr.success('Thêm tài khoản thành công');
                    resetFormCreateUpdate();
                    $('#modalCreateUpdateAccount').modal('hide');
                    renderTableAccount();
                }
            },
            error: function (error) {
                toastr.error('Thêm tài khoản thất bại');
                $('#modalCreateUpdateAccount').modal('hide');
            }
        });
    }
    else {
        $.ajax({
            url: '/category/update',
            type: 'PUT',
            data: {
                Id: id,
                ParentId: danhmuccha,
                CategoryName: tendanhmuc,
                Position: vitri,
                Description: mota,
                IsActived: kichhoat
            },
            success: function (data) {
                if (data) {
                    toastr.success('Cập nhật danh mục thành công');
                    resetFormCreateUpdate();
                    $('#modalCreateUpdateCategory').modal('hide');
                    renderTableCategories();
                }
            },
            error: function (error) {
                toastr.error('Cập nhật danh mục thất bại');
            }
        });
    }
}
function renderTableAccount() {
    $('#listaccount').empty();
    $.ajax({
        url: '/account/all',
        type: 'GET',
        success: function (data) {
            console.log("Danh sach du lieu: ", data);
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#listaccount').append(`
								<tr>
									<td class="text-center"><input type="checkbox"/></td>
                                    <td>${item.userName}</td>
									<td>${item.email}</td>
									<td class="text-center ${item.emailConfirmed ? "text-success" : "text-danger"}">${item.emailConfirmed ? "Đã kích hoạt" : "Chưa kích hoạt"}</td>
									<td>${item.phoneNumber == null ? "" : item.phoneNumber}</td>
                                    <td>${item.lockoutEnabled}</td>
                                    <td class="text-center">
										<button type="button" class="btn btn-primary" onclick="EditCategory('${item.id}')">Sửa</button>
										<button type="button" class="btn btn-danger" onclick="DeleteCategory('${item.id}')">Xóa</button>
									</td>
								</tr>
							`);
                });
            }
            else {
                $('#listaccount').append(`
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

function EditCategory(id) {
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

function DeleteCategory(id) {
    $.ajax({
        url: '/food/delete/' + id,
        type: 'DELETE',
        success: function (data) {
            if (data) {
                renderTableCategories();
            }
            else {
                alert('Xóa sản phẩm thất bại');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function resetFormCreateUpdate() {
    $('#idCategory').val('');
    $('#tendanhmuc').val('');
    $('#danhmuccha').prop('selectedIndex', 0);
    $('#vitri').val('');
    $('#mota').val('');
    $('#kichhoat').prop('checked', false);
}

//xử lý load dữ liệu danh mục cha
function renderCategoryParent() {
    $.ajax({
        url: '/category/all',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#danhmuccha').append(`
                        <option value="${item.categoryId}">${item.position + " - " + item.categoryName}</option>
                    `);
                });
            }
            else {
                $('#danhmuccha').append(`
                    <option value="">Không có dữ liệu</option>
                `);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

