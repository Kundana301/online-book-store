/* ---------------- LOGIN ---------------- */
function getUser() {
    let user = localStorage.getItem("loggedUser");
    if (!user) {
        localStorage.setItem("loggedUser", "demoUser"); // auto-login
        user = "demoUser";
    }
    return user;
}

/* ---------------- ADD TO CART ---------------- */
function addToCart(name, price) {
    let user = getUser();
    let cart = JSON.parse(localStorage.getItem("cart_" + user)) || [];

    let existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    localStorage.setItem("cart_" + user, JSON.stringify(cart));
    alert("Book added to cart!");
}

/* ---------------- LOAD CART ---------------- */
function loadCart() {
    let user = getUser();
    let cart = JSON.parse(localStorage.getItem("cart_" + user)) || [];

    let cartBody = document.getElementById("cart");
    let totalDiv = document.getElementById("totalAmount");
    let checkoutBtn = document.getElementById("checkoutBtn");

    cartBody.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartBody.innerHTML = `<tr><td colspan="4">Cart is empty</td></tr>`;
        checkoutBtn.disabled = true;
        totalDiv.innerHTML = "";
        return;
    }

    checkoutBtn.disabled = false;

    cart.forEach((item, index) => {
        let price = item.price * item.qty;
        total += price;

        cartBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>
                    <button onclick="decreaseQty(${index})">−</button>
                    ${item.qty}
                    <button onclick="increaseQty(${index})">+</button>
                </td>
                <td>₹${price}</td>
                <td>
                    <button onclick="removeItem(${index})">Remove</button>
                </td>
            </tr>
        `;
    });

    totalDiv.innerHTML = "Total Amount: ₹" + total;
}

/* ---------------- QTY ---------------- */
function increaseQty(index) {
    let user = getUser();
    let cart = JSON.parse(localStorage.getItem("cart_" + user));
    cart[index].qty++;
    localStorage.setItem("cart_" + user, JSON.stringify(cart));
    loadCart();
}

function decreaseQty(index) {
    let user = getUser();
    let cart = JSON.parse(localStorage.getItem("cart_" + user));
    if (cart[index].qty > 1) cart[index].qty--;
    localStorage.setItem("cart_" + user, JSON.stringify(cart));
    loadCart();
}

/* ---------------- REMOVE ---------------- */
function removeItem(index) {
    let user = getUser();
    let cart = JSON.parse(localStorage.getItem("cart_" + user));
    cart.splice(index, 1);
    localStorage.setItem("cart_" + user, JSON.stringify(cart));
    loadCart();
}

/* ---------------- CLEAR CART ---------------- */
function confirmClearCart() {
    if (confirm("Clear cart?")) {
        let user = getUser();
        localStorage.removeItem("cart_" + user);
        loadCart();
    }
}

/* ---------------- CHECKOUT ---------------- */
function checkoutCart() {
    window.location.href = "order-summary.html";
}

/* ---------------- ORDER SUMMARY ---------------- */
function loadSummary() {
    let user = getUser();
    let cart = JSON.parse(localStorage.getItem("cart_" + user)) || [];
    let div = document.getElementById("summary");

    let total = 0;
    div.innerHTML = "";

    cart.forEach(item => {
        let price = item.price * item.qty;
        total += price;
        div.innerHTML += `<p>${item.name} x ${item.qty} = ₹${price}</p>`;
    });

    div.innerHTML += `<h3>Total: ₹${total}</h3>`;
}

/* ---------------- PAYMENT ---------------- */
function makePayment() {
    let user = getUser();
    localStorage.removeItem("cart_" + user);
    window.location.href = "payment-success.html";
}
