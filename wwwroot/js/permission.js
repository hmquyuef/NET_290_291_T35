$(document).ready(() => {
    renderTablePermission();
});

function CreateUpdatePermission() {
    var userid = $('#selectaccount').val();
    var roleid = $('input[type="checkbox"]:checked').val();

    $.ajax({
        url: '/assignment/permission/create',
        type: 'POST',
        data: {
            userId: userid,
            roleId: roleid
        },
        success: function (data) {
            if (data) {
                toastr.success('Phân quyền thành công');
                $('#modalCreateUpdatePermission').modal('hide');
                renderTablePermission();
            }
        },
        error: function (error) {
            toastr.error('Quyền đã tồn tại');
            $('#modalCreateUpdateRoles').modal('hide');
        }
    });
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

function renderTablePermission() {
    $('#listpermission').empty();
    $.ajax({
        url: '/assignment/permission/all',
        type: 'GET',
        success: function (data) {
            console.log("Danh sach du lieu: ", data);
            if (data.length > 0) {
                data.forEach((item, index) => {
                    var parentName = data.filter(x => x.categoryId === item.parentId)[0].categoryName;
                    $('#listpermission').append(`
								<tr>
									<td class="text-center"><input type="checkbox"/></td>
                                    <td>${item.userName}</td>
									<td>${item.email}</td>
									<td class="text-center">${item.roleName}</td>
                                    <td class="text-center">Active</td>
									<td class="text-center">
										<button type="button" class="btn btn-primary" onclick="EditPermission('${item.id}')">Sửa</button>
										<button type="button" class="btn btn-danger" onclick="DeletePermission('${item.id}')">Xóa</button>
									</td>
								</tr>
							`);
                });
            }
            else {
                $('#listpermission').append(`
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

function renderSelectAccount() {
    $.ajax({
        url: '/account/all',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                $('#selectaccount').empty();
                $('#selectaccount').append(`
                            <option value="0">Chọn tài khoản</option>
                        `);
                data.forEach((item, index) => {
                    $('#selectaccount').append(`
                            <option value="${item.id}">${item.userName}</option>
                        `);
                });
            } else {
                $('#selectaccount').append(`
                            <option value="-1">Không có dữ liệu</option>
                        `);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

}

function renderTableRoles() {
    $.ajax({
        url: '/assignment/roles/all',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                $('#listassignrole').empty();
                data.forEach((item, index) => {
                    $('#listassignrole').append(`<tr>
                                                    <td class="text-center">
                                                        <input type="checkbox" value=${item.id}>
                                                    </td>
                                                    <td>${item.name}</td>
                                                </tr>`);
                });
            }
            else {
                $('#listassignrole').append(`<tr>
                                                <td class="text-center" colspan="2">Không có dữ liệu</td>
                                            </tr>`);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

//xử lý sự kiện mở modal thì thực hiện renderSelectAccount
$('#modalCreateUpdatePermission').on('show.bs.modal', function (e) {
    renderSelectAccount();
    renderTableRoles();
});

function EditPermission(id) {
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

function DeletePermission(id) {
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