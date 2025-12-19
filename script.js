/* LOGIN */
function loginUser() {
    let u = username.value;
    let p = password.value;

    if ((u === "user" && p === "1234") || (u === "admin" && p === "admin123")) {
        localStorage.setItem("loggedUser", u);
        location.href = u === "admin" ? "admin.html" : "index.html";
    } else alert("Invalid Login");
}

/* CART */
function getUser() {
    return localStorage.getItem("loggedUser");
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart_" + getUser())) || [];
}

function saveCart(c) {
    localStorage.setItem("cart_" + getUser(), JSON.stringify(c));
}

function addToCart(name, price) {
    let cart = getCart();
    let item = cart.find(i => i.name === name);
    item ? item.qty++ : cart.push({ name, price, qty: 1 });
    saveCart(cart);
    alert("Added to cart");
}

function loadCart() {
    let cart = getCart();
    let out = "";
    cart.forEach(i => {
        out += `<p>${i.name} × ${i.qty} = ₹${i.price * i.qty}</p>`;
    });
    document.getElementById("cart").innerHTML = out;
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
