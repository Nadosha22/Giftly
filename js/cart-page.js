let cartItems = document.querySelector(".cart-items");
let orderSummary = document.querySelector(".order-summary");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Cart Products
cart.forEach(function (gift) {
    let item = document.createElement("div");
    item.className = "cart-container";
    item.dataset.price = gift.price;
    item.dataset.name = gift.name;
    item.innerHTML = `
        <img src="${gift.image}" alt="${gift.name}">
        <div class="item-info">
            <h2>${gift.name}</h2>
            <p>${gift.price} EGP</p>
            <div class="quantity">
                <button class="minus">-</button>
                <span class="quantity-number">${gift.quantity}</span>
                <button class="plus">+</button>
            </div>
        </div>
        <button class="remove">Remove</button>
    `;
    cartItems.appendChild(item);

});
// Show / Hide Order Summary
function updateCartDisplay() {
    if(cart.length === 0){
        orderSummary.style.display = "none";
    }else{
        orderSummary.style.display = "block";
    }
}
// Plus Button
let plusButtons = document.querySelectorAll(".plus");
plusButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        let item = button.closest(".cart-container");
        let quantity = item.querySelector(".quantity-number");
        let currentNumber = Number(quantity.textContent);

        currentNumber++;
        quantity.textContent = currentNumber;
        updateLocalStorage(item, currentNumber);
        updateTotal();
    });
});
// Minus Button
let minusButtons = document.querySelectorAll(".minus");
minusButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        let item = button.closest(".cart-container");
        let quantity = item.querySelector(".quantity-number");
        let currentNumber = Number(quantity.textContent);
        if (currentNumber > 1) {
            currentNumber--;
            quantity.textContent = currentNumber;
            updateLocalStorage(item, currentNumber);
            updateTotal();
        }
    });
});
// Remove Button
let removeButtons = document.querySelectorAll(".remove");
removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        let item = button.closest(".cart-container");
        let name = item.dataset.name;
        cart = cart.filter(function (gift) {
            return gift.name !== name;
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        item.remove();
        updateTotal();
        updateCartDisplay();
        updateCartCount();
    });
});
// Update Quantity in LocalStorage
function updateLocalStorage(item, quantity) {
    let name = item.dataset.name;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let gift = cart.find(function (item) {
        return item.name === name;
    });
    if(gift){
        gift.quantity = quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Calculate Subtotal and Total
function updateTotal(){
    let items = document.querySelectorAll(".cart-container");
    let subtotal = 0;
    items.forEach(function (item) {
        let price = Number(item.dataset.price);
        let quantity = Number(
            item.querySelector(".quantity-number").textContent
        );
        subtotal += price * quantity;
    });
    let subtotalElement = document.querySelector("#subtotal");
    let totalElement = document.querySelector("#total");
    let shipping = 500;
    if(subtotalElement){
        subtotalElement.textContent = subtotal + " EGP";
    }
    if (totalElement) {
        totalElement.textContent = (subtotal + shipping) + " EGP";
    }
}
updateTotal();
updateCartDisplay();