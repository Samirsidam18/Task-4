function scrollToSection(id){
document.getElementById(id).scrollIntoView({
behavior:"smooth"
});
}

function send(){
document.getElementById("msg").innerText =
"✔ Message Sent Successfully!";
}
