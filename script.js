/* ----------------------- LOGIN FUNCTIONS ----------------------- */
function getUser() {
    return localStorage.getItem("loggedUser");
}

// Load cart when page opens
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDiv = document.getElementById("cart");

    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        cartDiv.innerHTML += `
            <div class="cart-item">
                <p><b>${item.name}</b></p>
                <p>Price: ₹${item.price}</p>
            </div>
        `;
    });
}

// Clear cart
function clearCart() {
    localStorage.removeItem("cart");   // IMPORTANT
    document.getElementById("cart").innerHTML =
        "<p>Your cart is empty.</p>";
    alert("Cart cleared successfully!");
}

// Checkout (optional)
function checkoutCart() {
    alert("Checkout successful!");
    clearCart();
}


/* ----------------------- CLEAR CART ----------------------- */
function clearCart() {
    let user = getUser();
    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    localStorage.removeItem("cart_" + user);
    loadCart(); // refresh view
    alert("Cart cleared successfully");
}

/* ----------------------- CHECKOUT ----------------------- */
function checkoutCart() {
    let user = getUser();
    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    let cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Save order for user
    let orders = JSON.parse(localStorage.getItem("orders_" + user)) || [];
    orders.push({ date: new Date().toLocaleString(), items: cart });
    localStorage.setItem("orders_" + user, JSON.stringify(orders));

    // Clear cart after checkout
    localStorage.removeItem("cart_" + user);
    loadCart();

    alert("Order placed successfully!");
    window.location.href = "order-summary.html";
}

/* PAYMENT */
function makePayment() {
    let user = getUser();
    let orders = JSON.parse(localStorage.getItem("orders_" + user)) || [];
    orders.push({ date: new Date().toLocaleString(), items: getCart() });
    localStorage.setItem("orders_" + user, JSON.stringify(orders));
    localStorage.removeItem("cart_" + user);
    location.href = "order-summary.html";
}

/* SEARCH */
function searchBooks() {
    let input = search.value.toLowerCase();
    document.querySelectorAll(".card").forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}
