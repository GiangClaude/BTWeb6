var productItems = document.querySelectorAll('.product-item');
var addProductForm = document.getElementById('addProductForm');
var addProductBtn = document.getElementById('addProductBtn');
var searchBtn = document.querySelector('#searchBtn');
var searchInput = document.querySelector('#searchInput');
var closeFormBtn = document.querySelector('.closeFormBtn');

function OnSearch() {
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


// --- Helpers để lưu/đọc localStorage ---
function loadProductsFromStorage() {
  try {
    const raw = localStorage.getItem('products');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error parsing products from localStorage', err);
    return [];
  }
}

function saveProducts(products) {
  try {
    localStorage.setItem('products', JSON.stringify(products));
  } catch (err) {
    console.error('Error saving products to localStorage', err);
  }
}


searchBtn.addEventListener('click', () => {
    OnSearch();
});
searchInput.addEventListener('input', () => {
    OnSearch();
});


addProductBtn.addEventListener('click', () => {
    // addProductForm.style.display = 'block';
    // show
    addProductForm.classList.remove('hidden');
    document.body.classList.add('modal-active');
});

closeFormBtn.addEventListener('click', () => {
    addProductForm.classList.add('hidden');
    document.body.classList.remove('modal-active');
    // addProductForm.style.display = 'none';
});

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Lấy giá trị từ form
    const name = document.getElementById('newName').value.trim(); 
    const price = document.getElementById('newPrice').value.trim(); 
    const desc = document.getElementById('newDesc').value.trim(); 

    // Kiểm tra nếu các trường không rỗng
    if (name === '' || price === '' || isNaN(price) || parseFloat(price) < 0) {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.textContent = 'Please enter valid name and price!';
        return;
    } else {
        errorMsg.textContent = ''; // Xóa thông báo lỗi nếu ok.
    }

    const newItem = document.createElement('article'); 
    newItem.className = 'product-item'; 
    // Tạo các phần tử con và thêm vào newItem 
    const title = document.createElement('h3'); 
    title.className = 'product-name'; 
    title.textContent = name; 

    const priceTag = document.createElement('p'); 
    priceTag.className = 'price'; 
    priceTag.textContent = `$${parseFloat(price).toFixed(2)}`;

    const description = document.createElement('p'); 
    description.textContent = desc;

    newItem.appendChild(title);
    newItem.appendChild(description);
    newItem.appendChild(priceTag);

    const productList = document.querySelector('.product-list');
    productList.prepend(newItem);

    productItems = document.querySelectorAll('.product-item'); // Cập nhật danh sách sản phẩm
    console.log(productItems);

    // Đóng form sau khi thêm
    addProductForm.reset(); // Reset form
    addProductForm.classList.add('hidden');
    document.body.classList.remove('modal-active');
});


