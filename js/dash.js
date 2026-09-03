var addBtn = document.querySelector(".add-btn");
var giftsTable = document.querySelector("#giftstable");
addBtn.addEventListener("click", () => {
    var productName = prompt("Enter Gift Name:");
    if (!productName) return;
    var category = prompt("Enter Category:");
    if (!category) return;
    var price = prompt("Enter Price:");
    if (!price) return;
    var stock = prompt("Enter Count In Stock:");
    if (!stock) return;

    var newRow = giftsTable.insertRow();
    newRow.innerHTML = `
        <td>${productName}</td>
        <td>${category}</td>
        <td>${price} EGP</td>
        <td>${stock}</td>
        <td>
            <button class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>

            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
        </td>
    `;

    alert("Product added successfully!");
});