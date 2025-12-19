/* ---------- CART LOGIC ---------- */
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
    let cart = getCart();
    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    saveCart(cart);
    alert(name + " added to cart");
}

function loadCart() {
    let cart = getCart();
    let tbody = document.getElementById("cart-items");
    let total = 0;
    tbody.innerHTML = "";

    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        total += subtotal;

        tbody.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <button onclick="updateQty(${index}, -1)">➖</button>
                ${item.qty}
                <button onclick="updateQty(${index}, 1)">➕</button>
            </td>
            <td>₹${subtotal}</td>
            <td><button onclick="removeItem(${index})">❌</button></td>
        </tr>`;
    });

    document.getElementById("total").innerText = total;
}

function updateQty(index, change) {
    let cart = getCart();
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    loadCart();
}

function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    loadCart();
}

/* ---------- LOGIN VALIDATION ---------- */
function loginUser() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === "admin" && p === "admin123") {
        alert("Login successful");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password");
    }
}

/* ---------- SEARCH FILTER ---------- */
function searchBooks() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
        cards[i].style.display = title.includes(input) ? "block" : "none";
    }
}
