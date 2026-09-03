let search = document.querySelector("#search");
let category = document.querySelector("#category");
let occasion = document.querySelector("#occasion");
let price = document.querySelector("#price");
let sort = document.querySelector("#sort");
let products = document.querySelectorAll(".product-card");

function filterProducts() {
    products.forEach((item) => {
        
        let searchMatch =item.querySelector("h3").innerText.toLowerCase().includes(search.value.toLowerCase());
        let categoryMatch = category.value == "All Categories" || item.querySelector("small").innerText == category.value;
        let occasionMatch =occasion.value == "All Occasions" ||  item.querySelector("h3").dataset.occasion == occasion.value;
        let priceMatch = false;
        let prod_price = parseInt(item.querySelector("strong").innerText);

        if (price.value == "All Prices") {
             priceMatch = true;
        }

        else if (price.value == "Under 500 EGP" && prod_price < 500)
            {
            priceMatch = true;
        }

        else if (price.value == "500 - 1000 EGP" && prod_price >= 500 && prod_price <= 1000)
         {
          priceMatch = true;
        }
        else if (price.value == "1000 - 2000 EGP" && prod_price > 1000 && prod_price <= 2000) 
        {
            priceMatch = true;
        }

        else if (price.value == "Over 2000 EGP" && prod_price > 2000)
            {
            priceMatch = true;
        }

        if (searchMatch &&categoryMatch &&occasionMatch &&priceMatch) {
            item.parentElement.style.display = "";
        }
        else {
            item.parentElement.style.display = "none";
        }
    });
}
search.addEventListener("input", filterProducts);
category.addEventListener("change", filterProducts);
occasion.addEventListener("change", filterProducts);
price.addEventListener("change", filterProducts);


sort.addEventListener("change", () => {
    if (sort.value == "Price: Low to High") {
        let productsArray = [];
        products.forEach((item) => {
            productsArray.push(item);
        });
        productsArray.sort((a, b) => {
            let priceA = parseInt(a.querySelector("strong").innerText);
            let priceB = parseInt(b.querySelector("strong").innerText);
            return priceA - priceB;
        });
        productsArray.forEach((item) => {
            item.parentElement.parentElement.appendChild(item.parentElement);
        });

    }
    else if (sort.value == "Price: High to Low") {
        let productsArray = [];
        products.forEach((item) => {
            productsArray.push(item);
        });
        productsArray.sort((a, b) => {
            let priceA =parseInt(a.querySelector("strong").innerText);
            let priceB =parseInt(b.querySelector("strong").innerText);
            return priceB - priceA;
        });
        productsArray.forEach((item) => {
            item.parentElement.parentElement.appendChild(item.parentElement);

        });

    }

});