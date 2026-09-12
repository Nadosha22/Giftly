//Responsive (Side Bar)
const menuBar = document.getElementById("menubar");
const sideBar = document.getElementById("sidebar");
const menuItems = document.querySelectorAll(".menu-item");

menuBar.addEventListener("click", () => {
    sideBar.classList.toggle("active");
});
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        sideBar.classList.remove("active");
    });
});

const addProductBtn = document.getElementById("addProductBtn");
const productModal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const productForm = document.getElementById("productForm");
const giftsTable = document.querySelector("#giftstable");

let editingIndex = null;
addProductBtn.addEventListener("click", () => {
    editingIndex = null;
    productForm.reset();
    document.querySelector(".product-modal h2").textContent = "Add New Gift";
    document.querySelector(".save-btn").textContent = "Add Gift";
    productModal.classList.add("active");
});
closeModal.addEventListener("click", () => {
    productModal.classList.remove("active");
});
cancelBtn.addEventListener("click", () => {
    productModal.classList.remove("active");
});
// Close when clicking outside
productModal.addEventListener("click", (e) => {
    if (e.target === productModal) {
        productModal.classList.remove("active");
    }
});
// Add / Edit Gift
productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const productName = document.getElementById("giftName").value;
    const category = document.getElementById("giftCategory").value;
    const price = document.getElementById("giftPrice").value;
    const stock = document.getElementById("giftStock").value;
    const imageFile = document.getElementById("giftImage").files[0];

    let gifts = JSON.parse(localStorage.getItem("gifts")) || [];
    // EDIT 
    if (editingIndex !== null) {
        const oldGift = gifts[editingIndex];
        // If user chooses a new image
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function () {
                gifts[editingIndex] = {
                    name: productName,
                    category: category,
                    price: price,
                    stock: stock,
                    image: reader.result
                };
                localStorage.setItem("gifts", JSON.stringify(gifts));
                displayGifts();
                productModal.classList.remove("active");
                productForm.reset();
                editingIndex = null;
                alert("Gift updated successfully!");
            };
            reader.readAsDataURL(imageFile);
        }else{
            gifts[editingIndex] = {
                name: productName,
                category: category,
                price: price,
                stock: stock,
                image: oldGift.image
            };
            localStorage.setItem("gifts", JSON.stringify(gifts));
            displayGifts();
            productModal.classList.remove("active");
            productForm.reset();
            editingIndex = null;
            alert("Gift updated successfully!");
        }
        return;
    }
    // ADD 
    if (!imageFile) {
        alert("Please choose an image.");
        return;
    }
    const reader = new FileReader();
    reader.onload = function () {
        const newGift = {
            name: productName,
            category: category,
            price: price,
            stock: stock,
            image: reader.result
        };
        gifts.push(newGift);
        localStorage.setItem("gifts", JSON.stringify(gifts));
        displayGifts();
        productModal.classList.remove("active");
        productForm.reset();
        alert("Gift added successfully!");
    };
    reader.readAsDataURL(imageFile);
});
// Display
function displayGifts(){
    const gifts = JSON.parse(localStorage.getItem("gifts")) || [];
    const oldDynamicRows = giftsTable.querySelectorAll(".dynamic-gift");
    oldDynamicRows.forEach(row => row.remove());
    gifts.slice().reverse().forEach((gift, index) => {
        const newRow = giftsTable.insertRow(1);
        newRow.classList.add("dynamic-gift");
        newRow.innerHTML = `
            <td>${gift.name}</td>
            <td>${gift.category}</td>
            <td>${gift.price} EGP</td>
            <td>${gift.stock}</td>
            <td>
                <button class="edit-btn" data-index="${gifts.length - 1 - index}">
                    <i class="fa-solid fa-pen-to-square"></i>
                    Edit
                </button>
                <button class="delete-btn" data-index="${gifts.length - 1 - index}">
                    <i class="fa-solid fa-trash"></i>
                    Delete
                </button>
            </td>
        `;
    });
}
// Edit Btn 
document.addEventListener("click", (e) =>{
    const editBtn = e.target.closest(".edit-btn");
    if(editBtn){
        const index = editBtn.dataset.index;
        const gifts = JSON.parse(localStorage.getItem("gifts")) || [];
        const gift = gifts[index];
        editingIndex = Number(index);
        document.getElementById("giftName").value = gift.name;
        document.getElementById("giftCategory").value = gift.category;
        document.getElementById("giftPrice").value = gift.price;
        document.getElementById("giftStock").value = gift.stock;
        document.querySelector(".product-modal h2").textContent = "Edit Gift";
        document.querySelector(".save-btn").textContent = "Save Changes";
        productModal.classList.add("active");
    }
});
// Delete Button
document.addEventListener("click", (e) =>{
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn){
        const index = deleteBtn.dataset.index;
        if (confirm("Are you sure you want to delete this gift?")) {
            let gifts = JSON.parse(localStorage.getItem("gifts")) || [];
            gifts.splice(index, 1);
            localStorage.setItem("gifts", JSON.stringify(gifts));
            displayGifts();
        }
    }
});
displayGifts();