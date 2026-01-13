const API_BASE_URL = '/api/clothing';

document.addEventListener('DOMContentLoaded', () => {
    loadAdminProducts();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('add-product-form').addEventListener('submit', handleAddProduct);
    document.getElementById('edit-product-form').addEventListener('submit', handleEditProduct);

    const editModal = document.getElementById('edit-modal');
    const closeBtn = editModal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
}

async function loadAdminProducts() {
    const productsList = document.getElementById('admin-products-list');
    productsList.innerHTML = '<p class="loading">Loading products...</p>';

    try {
        const response = await fetch(`${API_BASE_URL}`);
        const products = await response.json();

        displayAdminProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        productsList.innerHTML = '<p class="loading">Error loading products. Please try again.</p>';
    }
}

function displayAdminProducts(products) {
    const productsList = document.getElementById('admin-products-list');

    if (products.length === 0) {
        productsList.innerHTML = '<p class="loading">No products found. Add your first product above!</p>';
        return;
    }

    productsList.innerHTML = products.map(product => `
        <div class="admin-product-item">
            <img src="${product.image_url || 'https://via.placeholder.com/100?text=No+Image'}"
                 alt="${product.name}"
                 class="admin-product-image">
            <div class="admin-product-info">
                <h3>${product.name}</h3>
                <p><strong>Category:</strong> ${product.category} | <strong>Price:</strong> $${product.price.toFixed(2)}</p>
                <p><strong>Size:</strong> ${product.size} | <strong>Color:</strong> ${product.color} | <strong>Stock:</strong> ${product.stock}</p>
                <p>${product.description || 'No description'}</p>
            </div>
            <div class="admin-product-actions">
                <button class="btn btn-primary" onclick="showEditModal(${product.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

async function handleAddProduct(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        price: parseFloat(document.getElementById('price').value),
        size: document.getElementById('size').value,
        color: document.getElementById('color').value,
        stock: parseInt(document.getElementById('stock').value),
        image_url: document.getElementById('image_url').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Product added successfully!');
            document.getElementById('add-product-form').reset();
            loadAdminProducts();
        } else {
            const error = await response.json();
            alert('Error adding product: ' + error.error);
        }
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product. Please try again.');
    }
}

async function showEditModal(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${productId}`);
        const product = await response.json();

        document.getElementById('edit-id').value = product.id;
        document.getElementById('edit-name').value = product.name;
        document.getElementById('edit-description').value = product.description || '';
        document.getElementById('edit-category').value = product.category;
        document.getElementById('edit-price').value = product.price;
        document.getElementById('edit-size').value = product.size;
        document.getElementById('edit-color').value = product.color;
        document.getElementById('edit-stock').value = product.stock;
        document.getElementById('edit-image_url').value = product.image_url || '';

        document.getElementById('edit-modal').style.display = 'block';
    } catch (error) {
        console.error('Error loading product:', error);
        alert('Error loading product details.');
    }
}

async function handleEditProduct(e) {
    e.preventDefault();

    const productId = document.getElementById('edit-id').value;
    const formData = {
        name: document.getElementById('edit-name').value,
        description: document.getElementById('edit-description').value,
        category: document.getElementById('edit-category').value,
        price: parseFloat(document.getElementById('edit-price').value),
        size: document.getElementById('edit-size').value,
        color: document.getElementById('edit-color').value,
        stock: parseInt(document.getElementById('edit-stock').value),
        image_url: document.getElementById('edit-image_url').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Product updated successfully!');
            document.getElementById('edit-modal').style.display = 'none';
            loadAdminProducts();
        } else {
            const error = await response.json();
            alert('Error updating product: ' + error.error);
        }
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Error updating product. Please try again.');
    }
}

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${productId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Product deleted successfully!');
            loadAdminProducts();
        } else {
            const error = await response.json();
            alert('Error deleting product: ' + error.error);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
    }
}
