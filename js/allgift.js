function createGiftCard(gift) {
    const productCol = document.createElement("div");
    productCol.className = "col-12 col-sm-6 col-lg-4 col-xl-3 dynamic-product";
    productCol.innerHTML = `
        <div class="product-card h-100">
            <div class="product-image">
                <span class="badge-custom">New</span>
                <button class="wishlist">
                    <i class="fa-regular fa-heart"></i>
                </button>
                <img src="${gift.image}" alt="${gift.name}">
            </div>
            <div class="product-info">
                <small>${gift.category}</small>
                <h3>${gift.name}</h3>
                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="product-bottom">
                    <strong>${gift.price} EGP</strong>
                    <button class="cart-btn">
                        <i class="fa-solid fa-bag-shopping"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    return productCol;
}
function displayAddedGifts() {
    const gifts = JSON.parse(localStorage.getItem("gifts")) || [];
    const allContainer = document.getElementById("allProductsContainer");
    const womenContainer = document.getElementById("womenProductsContainer");
    const menContainer = document.getElementById("menProductsContainer");
    const childrenContainer = document.getElementById("childrenProductsContainer");
    gifts.forEach(gift => {
        allContainer.appendChild(createGiftCard(gift));
        // Category Section
        if (gift.category === "Women") {
            womenContainer.appendChild(createGiftCard(gift));
        }
        else if (gift.category === "Men") {
            menContainer.appendChild(createGiftCard(gift));
        }
        else if (gift.category === "Children") {
            childrenContainer.appendChild(createGiftCard(gift));
        }
    });
}
displayAddedGifts();

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