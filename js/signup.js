
let signupForm = document.querySelector("#signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        
        event.preventDefault();

        
        let name = document.querySelector("#name");
        let email = document.querySelector("#email");
        let password = document.querySelector("#password");
        let confirmPassword = document.querySelector("#confirm-password");

        
        if (name.value.trim() === "") {
            alert("Please enter your name");
            return;
        }

        
        if (email.value.trim() === "") {
            alert("Please enter your email");
            return;
        }

        
        if (!email.value.includes("@")) {
            alert("Please enter a valid email");
            return;
        }

        
        if (password.value.trim() === "") {
            alert("Please enter a password");
            return;
        }

        
        if (confirmPassword.value.trim() === "") {
            alert("Please confirm your password");
            return;
        }

        
        if (password.value !== confirmPassword.value) {
            alert("Passwords do not match");
            return;
        }

        
        alert("Account created successfully! Welcome to Giftly ");

    
        window.location.href = "index.html";

    });

}