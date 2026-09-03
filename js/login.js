
let loginForm = document.querySelector("#loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        
        event.preventDefault();

        
        let email = document.querySelector("#email");
        let password = document.querySelector("#password");

        
        if (email.value.trim() === "") {
            alert("Please enter your email");
            return;
        }

        
        if (!email.value.includes("@")) {
            alert("Please enter a valid email");
            return;
        }

        
        if (password.value.trim() === "") {
            alert("Please enter your password");
            return;
        }

    
        alert("Login successful! Welcome to Giftly ");

        
        window.location.href = "index.html";

    });

}