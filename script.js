function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart");
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let table = document.getElementById("cart-items");
    let total = 0;

    table.innerHTML = "";

    cart.forEach(item => {
        total += item.price;
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
            </tr>
        `;
    });

    document.getElementById("total").innerText = total;
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}
