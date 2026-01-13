const API_BASE_URL = '/api/clothing';

let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCategories();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    document.getElementById('clear-filters').addEventListener('click', clearFilters);

    const modal = document.getElementById('modal');
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

async function loadProducts(filters = {}) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '<p class="loading">Loading products...</p>';

    try {
        const queryParams = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE_URL}?${queryParams}`);
        const products = await response.json();

        allProducts = products;
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<p class="loading">Error loading products. Please try again.</p>';
    }
}

function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');

    if (products.length === 0) {
        productsGrid.innerHTML = '<p class="loading">No products found.</p>';
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="showProductDetail(${product.id})">
            <img src="${product.image_url || 'https://via.placeholder.com/300x400?text=No+Image'}"
                 alt="${product.name}"
                 class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-description">${product.description || ''}</div>
                <div class="product-details">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <span class="product-stock ${getStockClass(product.stock)}">
                        ${getStockText(product.stock)}
                    </span>
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;">
                    Size: ${product.size} | Color: ${product.color}
                </div>
            </div>
        </div>
    `).join('');
}

function getStockClass(stock) {
    if (stock === 0) return 'out-of-stock';
    if (stock < 10) return 'low-stock';
    return 'in-stock';
}

function getStockText(stock) {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return `Only ${stock} left`;
    return 'In Stock';
}

async function showProductDetail(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${productId}`);
        const product = await response.json();

        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');

        modalBody.innerHTML = `
            <img src="${product.image_url || 'https://via.placeholder.com/400x500?text=No+Image'}"
                 alt="${product.name}"
                 style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
            <h2>${product.name}</h2>
            <p style="color: ${getStockClass(product.stock) === 'in-stock' ? 'var(--success-color)' : 'var(--accent-color)'}; font-size: 1.1rem; margin: 0.5rem 0;">
                ${getStockText(product.stock)}
            </p>
            <p style="font-size: 2rem; font-weight: bold; color: var(--success-color); margin: 1rem 0;">
                $${product.price.toFixed(2)}
            </p>
            <p style="margin: 1rem 0;"><strong>Category:</strong> ${product.category}</p>
            <p style="margin: 1rem 0;"><strong>Size:</strong> ${product.size}</p>
            <p style="margin: 1rem 0;"><strong>Color:</strong> ${product.color}</p>
            <p style="margin: 1rem 0;"><strong>Description:</strong></p>
            <p style="color: #666; line-height: 1.6;">${product.description || 'No description available.'}</p>
        `;

        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading product detail:', error);
    }
}

async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        const categories = await response.json();

        const categoryFilter = document.getElementById('category-filter');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

function applyFilters() {
    const filters = {};

    const category = document.getElementById('category-filter').value;
    const size = document.getElementById('size-filter').value;
    const color = document.getElementById('color-filter').value;

    if (category) filters.category = category;
    if (size) filters.size = size;
    if (color) filters.color = color;

    loadProducts(filters);
}

function clearFilters() {
    document.getElementById('category-filter').value = '';
    document.getElementById('size-filter').value = '';
    document.getElementById('color-filter').value = '';
    loadProducts();
}
