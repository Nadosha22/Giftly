function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
function addToCart(product) {
    let cart = getCart();
    let existingItem = cart.find(function(item){
        return item.name === product.name;
    });
    if (existingItem) {
        existingItem.quantity++;
    }else{
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}
function updateCartCount(){
    let cart = getCart();
    let count = 0;
    cart.forEach(function(item){
        count += item.quantity;
    });
    let cartCount = document.querySelector(".cart-count");
    if(cartCount) {
        cartCount.textContent = count;
    }
}
document.addEventListener("click",function(e){
    let button = e.target.closest(".cart-btn");
    if (!button) return;
    let product = button.closest(".product-card");
    let name = product.querySelector("h3").textContent.trim();
    let price = Number(
        product.querySelector("strong").textContent.replace(/[^0-9.]/g, "")
    );
    let image = product.querySelector("img").src;
    addToCart({
        name: name,
        price: price,
        image: image
    });
});
//Cart Icon all pages
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    let cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("click", function () {
            window.location.href = "cart.html";
        });
    }
});