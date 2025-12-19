/* ----------------------- LOGIN FUNCTIONS ----------------------- */
function getUser() {
    return localStorage.getItem("loggedUser");
}

/* ----------------------- CART FUNCTIONS ----------------------- */
function getCart() {
    let user = getUser();
    if (!user) return [];
    return JSON.parse(localStorage.getItem("cart_" + user)) || [];
}

function saveCart(cart) {
    let user = getUser();
    if (!user) return;
    localStorage.setItem("cart_" + user, JSON.stringify(cart));
}

function addToCart(name, price) {
    let user = getUser();
    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    let cart = getCart();
    let item = cart.find(i => i.name === name);
    if (item) item.qty++;
    else cart.push({ name: name, price: price, qty: 1 });

    saveCart(cart);
    alert(name + " added to cart");
}

/* ----------------------- LOAD CART ----------------------- */
function loadCart() {
    let user = getUser();
    if (!user) {
        document.getElementById("cart").innerHTML =
            "<p>Please login to view cart.</p>";
        return;
    }

    let cart = getCart();

    if (cart.length === 0) {
        document.getElementById("cart").innerHTML =
            "<p>Your cart is empty.</p>";
        return;
    }

    let out = "<table><tr><th>Book</th><th>Qty</th><th>Price</th></tr>";

    cart.forEach(i => {
        out += `<tr>
                    <td>${i.name}</td>
                    <td>${i.qty}</td>
                    <td>₹${i.price * i.qty}</td>
                </tr>`;
    });

    out += "</table>";

    document.getElementById("cart").innerHTML = out;
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
