var productItems = document.querySelectorAll('.product-item');
var addProductForm = document.getElementById('addProductForm');
var addProductBtn = document.getElementById('addProductBtn');
var searchBtn = document.querySelector('#searchBtn');
var searchInput = document.querySelector('#searchInput');
var closeFormBtn = document.querySelector('.closeFormBtn');
var productList = document.querySelector('.product-list');
// --- Helpers để lưu/đọc localStorage ---
function loadProducts() {
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

function appendProduct(product) {
  const list = document.querySelector('.product-list'); // nơi chứa các product
  if (!list) return;

  const article = document.createElement('article');
  article.className = 'product-item';
  article.dataset.id = product.id;

  article.innerHTML = `
    <h3 class="product-name">${product.name}</h3>
    <p>${product.desc}</p>
    <p class="price">${product.price}</p>
    <button>Add to Cart</button>
  `;

  list.appendChild(article);

}


searchBtn.addEventListener('click', () => {
    OnSearch();
});
searchInput.addEventListener('input', () => {
    OnSearch();
});


addProductBtn.addEventListener('click', () => {
    addProductForm.classList.remove('hidden');
    document.body.classList.add('modal-active');
});

closeFormBtn.addEventListener('click', () => {
    addProductForm.classList.add('hidden');
    document.body.classList.remove('modal-active');
});

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Lấy giá trị từ form
    const name = document.getElementById('newName').value.trim(); 
    const price = document.getElementById('newPrice').value.trim(); 
    const desc = document.getElementById('newDesc').value.trim(); 


    // Kiểm tra nếu các trường không rỗng
    const errorMsg = document.getElementById('errorMsg');

    if (name === '' || price === '' || isNaN(price) || parseFloat(price) < 0) {
        errorMsg.textContent = 'Please enter valid name and price!';
        return;
    } else {
        errorMsg.textContent = '';
    }

    // Tạo object Product mới để lưu trữ LocalStorage
    const newProduct = {
      id: Date.now(),        // Tạo ID đơn giản dựa trên timestamp
      name,
      price,
      desc,
    };

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


    // Thêm sản phẩm mới vào danh sách
    const productList = document.querySelector('.product-list');
    productList.prepend(newItem);
    
    productItems = document.querySelectorAll('.product-item'); // Cập nhật danh sách sản phẩm

    // Đọc mảng hiện có, thêm product mới vào và lưu lại
    const products = loadProducts();
    products.push(newProduct);
    saveProducts(products);


    // Đóng form sau khi thêm
    addProductForm.reset(); // Reset form
    addProductForm.classList.add('hidden');
    document.body.classList.remove('modal-active');
});

document.addEventListener('DOMContentLoaded', () => {
  // Khi tải trang, load sản phẩm từ localStorage và hiển thị
  const stored = loadProducts();
  stored.forEach(appendProduct);
});




