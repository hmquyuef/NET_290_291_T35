$(document).ready(() => {
    renderTableRoles();
});

function CreateUpdateRoles() {
    var id = $('#idRoles').val();
    var quyen = $('#tenquyen').val();
    var mota = $('#mota').val();
    var kichhoat = $('#kichhoat').is(':checked');

    if (id === '') {
        $.ajax({
            url: '/assignment/roles',
            type: 'POST',
            data: {
                name: quyen
            },
            success: function (data) {
                if (data) {
                    toastr.success('Thêm quyền thành công');
                    resetFormCreateUpdate();
                    $('#modalCreateUpdateRoles').modal('hide');
                    renderTableRoles();
                }
            },
            error: function (error) {
                toastr.error('Quyền đã tồn tại');
                $('#modalCreateUpdateRoles').modal('hide');
            }
        });
    }
    //else {
    //    $.ajax({
    //        url: '/category/update',
    //        type: 'PUT',
    //        data: {
    //            Id: id,
    //            ParentId: danhmuccha,
    //            CategoryName: tendanhmuc,
    //            Position: vitri,
    //            Description: mota,
    //            IsActived: kichhoat
    //        },
    //        success: function (data) {
    //            if (data) {
    //                toastr.success('Cập nhật danh mục thành công');
    //                resetFormCreateUpdate();
    //                $('#modalCreateUpdateCategory').modal('hide');
    //                renderTableCategories();
    //            }
    //        },
    //        error: function (error) {
    //            toastr.error('Cập nhật danh mục thất bại');
    //        }
    //    });
    //}
}

function renderTableRoles() {
    $('#listrole').empty();
    $.ajax({
        url: '/assignment/roles/all',
        type: 'GET',
        success: function (data) {
            console.log("Danh sach du lieu: ", data);
            if (data.length > 0) {
                data.forEach((item, index) => {
                    var parentName = data.filter(x => x.categoryId === item.parentId)[0].categoryName;
                    $('#listrole').append(`
								<tr>
									<td class="text-center"><input type="checkbox"/></td>
                                    <td>${item.name}</td>
									<td>a</td>
									<td>a</td>
									<td class="text-center">
										<button type="button" class="btn btn-primary" onclick="EditRole('${item.id}')">Sửa</button>
										<button type="button" class="btn btn-danger" onclick="DeleteRole('${item.id}')">Xóa</button>
									</td>
								</tr>
							`);
                });
            }
            else {
                $('#listrole').append(`
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

function EditRole(id) {
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

function DeleteRole(id) {
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
    $('#idRoles').val('');
    $('#mota').val('');
    $('#kichhoat').prop('checked', false);
}