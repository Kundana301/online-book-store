/* ======================= LOGIN ======================= */
function getUser() {
    return localStorage.getItem("loggedUser");
}

/* ======================= ADD TO CART (FIXED) ======================= */
function addToCart(name, price) {
    let user = getUser();

    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    let key = "cart_" + user;
    let cart = JSON.parse(localStorage.getItem(key)) || [];

    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty += 1;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    localStorage.setItem(key, JSON.stringify(cart));
    alert("Book added to cart successfully!");
}

/* ======================= CART HELPERS ======================= */
function getCart() {
    let user = getUser();
    if (!user) return [];
    return JSON.parse(localStorage.getItem("cart_" + user)) || [];
}

function saveCart(cart) {
    let user = getUser();
    localStorage.setItem("cart_" + user, JSON.stringify(cart));
}

/* ======================= LOAD CART ======================= */
function loadCart() {
    let user = getUser();
    let cartBody = document.getElementById("cart");
    let totalDiv = document.getElementById("totalAmount");
    let checkoutBtn = document.getElementById("checkoutBtn");

    if (!cartBody) return;

    cartBody.innerHTML = "";

    if (!user) {
        cartBody.innerHTML =
            `<tr><td colspan="4">Please login to view cart.</td></tr>`;
        if (checkoutBtn) checkoutBtn.disabled = true;
        if (totalDiv) totalDiv.innerHTML = "";
        return;
    }

    let cart = getCart();
    let total = 0;

    if (cart.length === 0) {
        cartBody.innerHTML =
            `<tr><td colspan="4">Your cart is empty.</td></tr>`;
        if (checkoutBtn) checkoutBtn.disabled = true;
        if (totalDiv) totalDiv.innerHTML = "";
        return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;

    cart.forEach((item, index) => {
        let qty = item.qty || 1;
        let price = item.price * qty;
        total += price;

        cartBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td align="center">
                    <button onclick="decreaseQty(${index})">−</button>
                    ${qty}
                    <button onclick="increaseQty(${index})">+</button>
                </td>
                <td align="center">₹${price}</td>
                <td align="center">
                    <button onclick="removeItem(${index})">Remove</button>
                </td>
            </tr>
        `;
    });

    if (totalDiv)
        totalDiv.innerHTML = `<b>Total Amount: ₹${total}</b>`;
}

/* ======================= QUANTITY CONTROLS ======================= */
function increaseQty(index) {
    let cart = getCart();
    cart[index].qty = (cart[index].qty || 1) + 1;
    saveCart(cart);
    loadCart();
}

function decreaseQty(index) {
    let cart = getCart();
    if ((cart[index].qty || 1) > 1) {
        cart[index].qty--;
    }
    saveCart(cart);
    loadCart();
}

/* ======================= REMOVE ITEM ======================= */
function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    loadCart();
}

/* ======================= CLEAR CART ======================= */
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
}

/* ======================= CHECKOUT ======================= */
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

    localStorage.setItem("currentOrder_" + user, JSON.stringify(cart));
    window.location.href = "order-summary.html";
}

/* ======================= PAYMENT ======================= */
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

/* ======================= SEARCH ======================= */
function searchBooks() {
    let input = search.value.toLowerCase();
    document.querySelectorAll(".card").forEach(c => {
        c.style.display =
            c.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}
