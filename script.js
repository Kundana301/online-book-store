/* ----------------------- LOGIN ----------------------- */
function getUser() {
    return localStorage.getItem("loggedUser");
}

function getCart() {
    let user = getUser();
    if (!user) return [];
    return JSON.parse(localStorage.getItem("cart_" + user)) || [];
}

function saveCart(cart) {
    let user = getUser();
    localStorage.setItem("cart_" + user, JSON.stringify(cart));
}

/* ----------------------- LOAD CART ----------------------- */
function loadCart() {
    let user = getUser();
    let cartDiv = document.getElementById("cart");
    let totalDiv = document.getElementById("totalAmount");
    let checkoutBtn = document.getElementById("checkoutBtn");

    cartDiv.innerHTML = "";

    if (!user) {
        cartDiv.innerHTML = "<p>Please login to view cart.</p>";
        checkoutBtn.disabled = true;
        totalDiv.innerHTML = "";
        return;
    }

    let cart = getCart();
    let total = 0;

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty.</p>";
        checkoutBtn.disabled = true;
        totalDiv.innerHTML = "";
        return;
    }

    checkoutBtn.disabled = false;

    cart.forEach((item, index) => {
        total += item.price;
        cartDiv.innerHTML += `
            <div class="cart-item">
                <p><b>${item.name}</b></p>
                <p>Price: ₹${item.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalDiv.innerHTML = "<b>Total Amount: ₹" + total + "</b>";
}

/* ----------------------- REMOVE SINGLE ITEM ----------------------- */
function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    loadCart();
}

/* ----------------------- CLEAR CART WITH CONFIRM ----------------------- */
function confirmClearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
        clearCart();
    }
}

function clearCart() {
    let user = getUser();
    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    localStorage.removeItem("cart_" + user);
    loadCart();
    alert("Cart cleared successfully!");
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

    let orders = JSON.parse(localStorage.getItem("orders_" + user)) || [];
    orders.push({
        date: new Date().toLocaleString(),
        items: cart
    });

    localStorage.setItem("orders_" + user, JSON.stringify(orders));
    localStorage.removeItem("cart_" + user);

    alert("Order placed successfully!");
    window.location.href = "order-summary.html";
}

/* ----------------------- PAYMENT ----------------------- */
function makePayment() {
    let user = getUser();
    if (!user) return;

    let orders = JSON.parse(localStorage.getItem("orders_" + user)) || [];
    orders.push({
        date: new Date().toLocaleString(),
        items: getCart()
    });

    localStorage.setItem("orders_" + user, JSON.stringify(orders));
    localStorage.removeItem("cart_" + user);
    window.location.href = "order-summary.html";
}

/* ----------------------- SEARCH ----------------------- */
function searchBooks() {
    let input = search.value.toLowerCase();
    document.querySelectorAll(".card").forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(input)
            ? "block"
            : "none";
    });
}
