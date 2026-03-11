// --- DATA ---
const products = [
    { id: 1, name: "Wireless Headphones", price: 59.99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80", desc: "High quality noise cancelling headphones." },
    { id: 2, name: "Smart Watch", price: 129.99, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80", desc: "Track your fitness and stay connected." },
    { id: 3, name: "Running Shoes", price: 89.99, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", desc: "Lightweight and comfortable for running." },
    { id: 4, name: "Denim Jacket", price: 49.99, category: "Fashion", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=400&q=80", desc: "Classic style denim jacket for any season." },
    { id: 5, name: "Sunglasses", price: 24.99, category: "Fashion", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80", desc: "UV protection stylish sunglasses." },
    { id: 6, name: "Mechanical Keyboard", price: 110.00, category: "Electronics", image: "https://images.unsplash.com/photo-1727504563741-ed8bd9bf5e4d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: "RGB backlit mechanical keyboard." }

];

let cart = [];



window.onload = () => {
    renderProducts('featured-products', products.slice(0, 3));
    renderProducts('all-products', products);
};



function navigateTo(pageId) {

    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0,0);
}


function renderProducts(containerId, productArray) {
    const container = document.getElementById(containerId);
    container.innerHTML = productArray.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img" onclick="openModal(${product.id})">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}



function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    alert(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').innerText = totalCount;


    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalContainer.innerText = '0.00';
        return;
    }

    let total = 0;
    cartContainer.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <small>$${item.price} x ${item.quantity}</small>
                </div>
                <button class="btn" style="background-color: #ef4444; padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    }).join('');
    
    totalContainer
}