var productItems = document.querySelectorAll('.product-item');
var addProductForm = document.getElementById('addProductForm');
var addProductBtn = document.getElementById('addProductBtn');
var searchBtn = document.querySelector('#searchBtn');
var searchInput = document.querySelector('#searchInput');
var closeFormBtn = document.querySelector('.closeFormBtn');

function OnSearch() {
    // Lấy giá trị ô tìm kiếm
    let value = searchInput.value.toLowerCase();
    if (value !== '') {
        productItems.forEach(product => {
            // Lấy tên
            let productName = product.querySelector('.product-name').textContent.toLowerCase();
            if (!productName.includes(value)) {  
                //Nếu không trùng thì ẩn
                product.style.display = "none";
            } else {
                product.style.display = "";  
            }
        });
    }
    if (value === '') {
        productItems.forEach(product => {
            product.style.display = "";  // Hiển thị lại tất cả sản phẩm nếu ô tìm kiếm trống
        });
    }
}


searchBtn.addEventListener('click', () => {
    //Gán function
    OnSearch();
});
searchInput.addEventListener('input', () => {
    OnSearch();
});


addProductBtn.addEventListener('click', () => {
    // Bỏ class hidden để hiện form
    // Hiện modal active để làm lớp overlay
    addProductForm.classList.remove('hidden');
    document.body.classList.add('modal-active');
});

closeFormBtn.addEventListener('click', () => {
    // Thêm class hidden để ẩn form
    // Ẩn modal active
    addProductForm.classList.add('hidden');
    document.body.classList.remove('modal-active');
});
