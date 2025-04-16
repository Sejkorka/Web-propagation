const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {

    const bodyMessage = `Jméno: ${fullName.value} <br> Email: ${email.value} <br> Telefon: ${phone.value} <br> Předmět: ${subject.value} <br> Zpráva: ${message.value} <br>`;

    Email.send({
        SecureToken :"bbb9fdbe-099c-4149-9e93-1b4143d37894",
        To : 'sejkoraphotography@gmail.com',
        From : "sejkoraphotography@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message == "OK"){
            Swal.fire({
                title: "Skvělé",
                text: "Zpráva byla odeslána, co nejdříve se vám ozvu.",
                icon: "success"
              });
        }
      }
    );
}

function checkInputs (){
    const items = document.querySelectorAll(".item");

    for (const item of items){
        if (item.value == ""){
            item.classList.add("error");
            item.parentElement.classList.add("error");

        }

        if (items [1].value != ""){
            checkEmail();
        }

        items[1].addEventListener("keyup", () =>{
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value != ""){
            item.classList.remove("error");
            item.parentElement.classList.remove("error");

            }
            else{
            item.classList.add("error");
            item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail(){
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2, 3})?$/;

    const errorTxtEmail = document.querySelector(".error-txt.email")

    if(!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value !=""){
            errorTxtEmail.innerText = "Zadejte platný email";
        }
        else{
            errorTxtEmail.innerText = "Email nemůže být prázdný";
        }
    }
    else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error")
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs ();

    if(!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")){
        sendEmail();

        form.reset();
        return false;
    }
})

const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function(){
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')
}