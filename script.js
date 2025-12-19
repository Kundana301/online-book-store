/* ---------------- LOGIN / REGISTER ---------------- */
function getUser() {
    return localStorage.getItem("loggedUser");
}

function register() {
    let username = document.getElementById("regUser").value.trim();
    let password = document.getElementById("regPass").value.trim();
    if(!username || !password) { alert("Enter username & password"); return; }
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if(users[username]) { alert("User already exists"); return; }
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully! You can now login.");
    document.getElementById("regUser").value="";
    document.getElementById("regPass").value="";
}

function login() {
    let username = document.getElementById("loginUser").value.trim();
    let password = document.getElementById("loginPass").value.trim();
    if(!username || !password) { alert("Enter username & password"); return; }
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if(users[username] && users[username] === password){
        localStorage.setItem("loggedUser", username);
        alert("Login successful!");
        window.location.href = "index.html";
    } else { alert("Invalid credentials"); }
}

function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}

/* ---------------- CART ---------------- */
function getCart() {
    let user = getUser();
    if (!user) return [];
    return JSON.parse(localStorage.getItem("cart_" + user)) || [];
}
function saveCart(cart) {
    let user = getUser();
    localStorage.setItem("cart_" + user, JSON.stringify(cart));
}

function addToCart(book) {
    let user = getUser();
    if(!user){ alert("Login first"); window.location.href="login.html"; return; }
    let cart = getCart();
    let index = cart.findIndex(i=>i.id===book.id);
    if(index!==-1){ cart[index].qty=(cart[index].qty||1)+1; }
    else{ book.qty=1; cart.push(book); }
    saveCart(cart);
    alert(`${book.name} added to cart!`);
}

function loadCart() {
    let cartBody = document.getElementById("cart");
    let totalDiv = document.getElementById("totalAmount");
    let checkoutBtn = document.getElementById("checkoutBtn");
    let cart = getCart();
    let total=0;
    if(!cartBody) return; // on pages without cart
    cartBody.innerHTML="";
    if(cart.length===0){
        cartBody.innerHTML=`<tr><td colspan="4">Cart is empty</td></tr>`;
        checkoutBtn.disabled=true;
        totalDiv.innerHTML="";
        return;
    }
    checkoutBtn.disabled=false;
    cart.forEach((item,index)=>{
        let price=item.price*(item.qty||1);
        total+=price;
        cartBody.innerHTML+=`
        <tr>
            <td>${item.name}</td>
            <td align="center">
                <button onclick="decreaseQty(${index})">−</button> ${item.qty||1} <button onclick="increaseQty(${index})">+</button>
            </td>
            <td align="center">₹${price}</td>
            <td align="center"><button onclick="removeItem(${index})">Remove</button></td>
        </tr>`;
    });
    totalDiv.innerHTML=`<b>Total Amount: ₹${total}</b>`;
}

function increaseQty(index){ let cart=getCart(); cart[index].qty=(cart[index].qty||1)+1; saveCart(cart); loadCart(); }
function decreaseQty(index){ let cart=getCart(); if((cart[index].qty||1)>1) cart[index].qty--; saveCart(cart); loadCart(); }
function removeItem(index){ let cart=getCart(); cart.splice(index,1); saveCart(cart); loadCart(); }

function confirmClearCart(){ if(confirm("Clear cart?")) clearCart(); }
function clearCart(){ let user=getUser(); if(!user){alert("Login first"); window.location.href="login.html"; return;} localStorage.removeItem("cart_"+user); loadCart(); alert("Cart cleared!"); }

function checkoutCart(){ 
    let user=getUser(); 
    if(!user){alert("Login first"); window.location.href="login.html"; return;} 
    let cart=getCart(); 
    if(cart.length===0){alert("Cart empty"); return;} 
    localStorage.setItem("currentOrder_"+user, JSON.stringify(cart)); 
    window.location.href="order-summary.html";
}

function makePayment(){
    let user=getUser(); 
    if(!user) return;
    let orders = JSON.parse(localStorage.getItem("orders_"+user))||[];
    orders.push({date:new Date().toLocaleString(), items:getCart()});
    localStorage.setItem("orders_"+user, JSON.stringify(orders));
    localStorage.removeItem("cart_"+user);
    window.location.href="payment-success.html";
}
