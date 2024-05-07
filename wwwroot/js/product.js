$(document).ready(function(){
    renderTableProduct();
    renderCategory();
});

function CreateUpdateCategory() {
    var id = $('#idProduct').val();
    var tensanpham = $('#tensanpham').val();
    var giaca = $('#giaca').val();
    var danhmuc = $('#danhmuc').val();
    var mota = $('#mota').val();
    var kichhoat = $('#kichhoat').is(':checked');
    var file = $('#formFile')[0].files[0];

    //create form data
    var formData = new FormData();
    formData.append('file', file);
    formData.append('ProductId', id);
    formData.append('ProductName', tensanpham);
    formData.append('Price', giaca);
    formData.append('categoryId', danhmuc);
    formData.append('Description', mota);
    formData.append('IsActived', kichhoat);

    //upload file to controller with ajax
    if (id === '') {
        $.ajax({
            url: '/product/create',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    toastr.success('Thêm sản phẩm thành công');
                    resetFormCreateUpdateProduct();
                    $('#modalCreateUpdateProduct').modal('hide');
                    renderTableProduct();
                }
            },
            error: function (error) {
                toastr.error('Thêm sản phẩm thất bại');
            }
        });
    } else {
            $.ajax({
                url: '/product/update',
                type: 'PUT',
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data) {
                        toastr.success('Cập nhật danh mục thành công');
                        resetFormCreateUpdateProduct();
                        $('#modalCreateUpdateProduct').modal('hide');
                        renderTableProduct();
                    }
                },
                error: function (error) {
                    toastr.error('Cập nhật danh mục thất bại');
                }
            });
    }
}
function renderTableProduct() {
    $('#listproduct').empty();
    $.ajax({
        url: '/product/all',
        type: 'GET',
        success: function (data) {
            console.log("Danh sach du lieu: ", data);
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#listproduct').append(`
								<tr>
									<td class="text-center" data-productid="${item.productId}"><input type="checkbox" class="form-check-input checkbox-item"/></td>
                                    <td>${item.productName}</td>
                                    <td class="text-center">${item.price.toLocaleString()} </td>
									<td class="text-center">${item.votes}</td>
									<td>${item.categorys.categoryName}</td>
                                    <td class="text-center ${item.isActived ? 'bg-label-success' : 'bg-label-danger'}">${item.isActived ? 'Đã kích hoạt' : 'Chưa kích hoạt'}</td>
                                    <td>${item.description}</td>
									<td class="text-center">
                                        <button type="button" class="btn btn-label-info w-px-20" onclick="EditProduct('${item.productId}')">
                                            <i class='bx bx-message-square-edit' ></i>
                                        </button>
									</td>
								</tr>
							`);
                });
            }
            else {
                $('#listproduct').append(`
							<tr>
								<td class="text-center" colspan="8"">Không có dữ liệu</td>
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

function EditProduct(id) {
    $.ajax({
        url: '/product/byid/' + id,
        type: 'GET',
        success: function (data) {
            if (data) {
                $('#idProduct').val(data.productId);
                $('#tensanpham').val(data.productName);
                $('#giaca').val(data.price);
                $('#danhmuc').val(data.categoryId);
                $('#mota').val(data.description);
                $('#kichhoat').prop('checked', data.isActived);
                $('#areaimage').empty();
                $('#areaimage').append(`<img src="${data.image}" class="img-fluid" alt="Image" />`);
                $('#modalCreateUpdateProduct').modal('show');
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
        url: '/product/delete/' + id,
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

function resetFormCreateUpdateProduct() {
    $('#idProduct').val('');
    $('#tensanpham').val('');
    $('#giaca').val('');
    $('#danhmuc').prop('selectedIndex', 0);
    $('#kichhoat').prop('checked', false);
    $('#areaimage').empty();
    $('#areaimage').append(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
                                <rect width="300" height="300" fill="#cccccc"></rect>
                                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="25px" fill="#333333">300x300</text>
                            </svg>`);
    $('#mota').val('');
}

//xử lý sự kiện dimiss modal
$('#modalCreateUpdateProduct').on('hidden.bs.modal', function (e) {
    resetFormCreateUpdateProduct();
});

//lắng nghe sự kiện thay giá trị file input cho areaimage
$('#formFile').change(function () {
    $('#areaimage').empty();
    $('#areaimage').append(`<img src="${URL.createObjectURL(this.files[0])}" class="img-fluid" alt="Image" />`);
});

//xử lý dữ liệu cho danh mục sản phẩm
function renderCategory() {
    $('#danhmuc').empty();
    $.ajax({
        url: '/category/all',
        type: 'GET',
        success: function (data) {
            console.log(data)
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#danhmuc').append(`<option value="${item.categoryId}">${item.position + " - " + item.categoryName}</option>`);
                });
            }
            else {
                $('#danhmuc').append(`<option value="">Không có dữ liệu</option>`);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

//xử lý sự kiện khi nhấn vào allCheckbox thì sẽ chọn các checkbox-item
$('#allCheckbox').change(function () {
    if (this.checked) {
        $('.checkbox-item').prop('checked', true);
    } else {
        $('.checkbox-item').prop('checked', false);
    }
});

//hàm xử lý xóa khi có nhiều checkbox-item được chọn
function DeleteProduct() {
    //lấy ra danh sách id của các checkbox-item được chọn
    var listId = [];
    $('.checkbox-item').each(function () {
        if (this.checked) {
            listId.push($(this).closest('td').data('productid'));
        }
    });
    console.log(listId);
    $.ajax({
        url: '/product/delete',
        type: 'DELETE',
        data: { ids: listId },
        success: function (data) {
            toastr.success(`Xóa ${listId.length} sản phẩm thành công`);
            renderTableProduct();
        },
        error: function (error) {
            console.log(error);
        }
    });
}