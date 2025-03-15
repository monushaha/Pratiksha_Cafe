let selectedItems = [];

// Load menu when the page loads
window.onload = loadMenu;

// Load menu
function loadMenu() {
    fetch('/menu')
    .then(response => response.json())
    .then(data => {
        const menuList = document.getElementById('menu-list');
        data.menu.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            li.onclick = () => selectItem(item);
            menuList.appendChild(li);
        });
    });
}

// Select item
function selectItem(item) {
    selectedItems.push(item);
    alert(`${item.name} added to order`);
}

// Place order
function placeOrder() {
    fetch('/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: selectedItems })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'order_placed') {
            alert('Order placed successfully');
            document.getElementById('menu').style.display = 'none';
            document.getElementById('feedback').style.display = 'block';
        }
    });
}

// Submit feedback
function submitFeedback() {
    const feedbackText = document.getElementById('feedback-text').value;
    fetch('/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: feedbackText })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'feedback_received') {
            alert('Thank you for your feedback!');
            window.location.reload(); // Restart the process
        }
    });
} 