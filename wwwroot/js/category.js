$(document).ready(() => {
    renderTableCategories();
    renderCategoryParent();
});

function CreateUpdateCategory() {
    var id = $('#idCategory').val();
    var tendanhmuc = $('#tendanhmuc').val();
    var danhmuccha = $('#danhmuccha').val();
    var vitri = $('#vitri').val();
    var mota = $('#mota').val();
    var kichhoat = $('#kichhoat').is(':checked');

    if (id === '') {
        $.ajax({
            url: '/category/create',
            type: 'POST',
            data: {
                ParentId: danhmuccha,
                CategoryName: tendanhmuc,
                Position: vitri,
                Description: mota,
                IsActived: kichhoat
            },
            success: function (data) {
                if (data) {
                    toastr.success('Thêm danh mục thành công');
                    resetFormCreateUpdate();
                    $('#modalCreateUpdateCategory').modal('hide');
                    renderTableCategories();
                }
            },
            error: function (error) {
                toastr.error('Thêm danh mục thất bại');
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
function renderTableCategories() {
    $('#listcategories').empty();
    $.ajax({
        url: '/category/all',
        type: 'GET',
        success: function (data) {
            console.log("Danh sach du lieu: ", data);
            if (data.length > 0) {
                data.forEach((item, index) => {
                    var parentName = data.filter(x => x.categoryId === item.parentId)[0].categoryName;
                    $('#listcategories').append(`
								<tr>
									<td class="text-center"><input type="checkbox"/></td>
                                    <td>${item.categoryName}</td>
                                    <td class="text-center">${item.parentId == item.categoryId ? '' : parentName} </td>
									<td>${item.position}</td>
									<td>${item.description}</td>
									<td class="text-center">
										<button type="button" class="btn btn-primary" onclick="EditCategory('${item.id}')">Sửa</button>
										<button type="button" class="btn btn-danger" onclick="DeleteCategory('${item.id}')">Xóa</button>
									</td>
								</tr>
							`);
                });
            }
            else {
                $('#listcategories').append(`
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

