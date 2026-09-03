// JavaScript for NavBar 
let check = document.querySelector("#check");
let navLinks = document.querySelectorAll("nav a:not(.dropdown-toggle)");

navLinks.forEach(link =>{
    link.addEventListener("click",()=>{
        check.checked=false;
    });
});

// For validate admin to enter dashboard
let acessdash=document.querySelector("#dashboard")
var adminname="Nada Nabil"
var adminpass="12345"
acessdash.addEventListener("click",(event)=>{
    event.preventDefault();
    var username=prompt("This page is for admin!\nPlease enter the user name")
    var userpass=prompt("Enter the password")
    if(username==adminname && userpass==adminpass){
        window.location.href="../html/dashboard.html#dashboard";
    }
    else{
        alert("The username or password maybe wrong\nThis page is only for admin")
    }
})

//For contact form
let form = document.querySelector("#contactForm");
form.addEventListener("submit",function(e){
    e.preventDefault();
    let name = document.querySelector("#name").value.trim();
    let phone = document.querySelector("#phone").value.trim();
    let gmail = document.querySelector("#gmail").value.trim();
    let message = document.querySelector("#Textarea").value.trim();

    if (name==="" || phone==="" || gmail==="" || message===""){
        alert("Please fill all fields");
        return;
    }
    let contact={
        name: name,
        phone: phone,
        gmail: gmail,
        message: message
    };
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push(contact);
    
    localStorage.setItem("contacts", JSON.stringify(contacts));
    alert("Your message has been sent successfully!");
    form.reset();
});