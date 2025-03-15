let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h4').textContent;
            const itemPrice = parseInt(menuItem.querySelector('.price').textContent.replace('₹', ''));
            const itemImage = menuItem.querySelector('img').src;
            
            addToCart(itemName, itemPrice, itemImage);
            updateCartDisplay();
        });
    });

    // Add click listener to checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Thank you for your order! Total amount: ' + document.getElementById('cart-total-amount').textContent);
            cart = [];
            updateCartDisplay();
            updateCartBadge();
        } else {
            alert('Your cart is empty!');
        }
    });
});

function addToCart(name, price, image) {
    cart.push({ name, price, image });
    updateCartBadge();
    // Show feedback to user
    alert(`Added ${name} to cart! Price: ₹${price}`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartBadge();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('cart-total-amount');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">₹${item.price}</span>
                </div>
                <i class="fas fa-times remove-item" onclick="removeFromCart(${index})"></i>
            </div>
        `;
    });

    totalAmount.textContent = `₹${total}`;
}

function updateCartBadge() {
    const cartLink = document.querySelector('a[href="#cart"]');
    cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${cart.length})`;
}

// Handle contact form
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/api/contact', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent successfully!');
        this.reset();
    });
});
