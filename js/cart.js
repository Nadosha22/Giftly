


let plusButtons = document.querySelectorAll(".plus");

plusButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let quantity = button.parentElement.querySelector(".quantity-number");

        let currentNumber = Number(quantity.textContent);

        quantity.textContent = currentNumber + 1;

        updateTotal();
    });

});



let minusButtons = document.querySelectorAll(".minus");

minusButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let quantity = button.parentElement.querySelector(".quantity-number");

        let currentNumber = Number(quantity.textContent);

        if (currentNumber > 1) {

            quantity.textContent = currentNumber - 1;

            updateTotal();
        }

    });

});



let removeButtons = document.querySelectorAll(".remove");

removeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let item = button.parentElement;

        item.remove();

        updateTotal();
    });

});


function updateTotal() {

    let cartItems = document.querySelectorAll(".cart-container");

    let subtotal = 0;

    cartItems.forEach(function (item) {

        let price = Number(item.dataset.price);

        let quantity = Number(
            item.querySelector(".quantity-number").textContent
        );

        subtotal += price * quantity;

    });


    
    let subtotalElement = document.querySelector("#subtotal");
    let totalElement = document.querySelector("#total");


    
    let shipping = 500;



    if (subtotalElement) {
        subtotalElement.textContent = subtotal + " EGP";
    }


    
    if (totalElement) {
        totalElement.textContent = (subtotal + shipping) + " EGP";
    }

}



if (document.querySelector(".cart-container")) {
    updateTotal();
}