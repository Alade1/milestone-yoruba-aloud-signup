//accessing the sign-up b-opm,  tton
const signUp = document.getElementById("signUp");
signUp.innerText="SignUp";

signUp.addEventListener("click", (event)=>{
    event.preventDefault();

    const Name = document.getElementById("name").value;
    const Email =document.getElementById("email").value;
    const Password =document.getElementById("password").value;
    const confirmPassword= document.getElementById("confirmPassword").value;

    signUp.innerText="Loading...";
    signUp.classList.add ("pulse");

   if(
    Name === " "||
    Email === " "||
    Password ===" "||
    confirmPassword===" "){
    swal.fire({
        icon: "info",
        text: "All fields are required",
        confirmButtonText: "ok",
      })

     signUp.innerText = "SignUp";
     signUp.classList.remove ("pulse");


   }
   else if(
    Password !== confirmPassword
   ){
    swal.fire({
        icon: "info",
        text: "Passwords do not match",
        confirmButtonText: "ok",
      });
      signUp.innerText = "SignUp";
     signUp.classList.remove ("pulse");

   }
   else{
    const SignUpData = new FormData();
    SignUpData.append("name", Name);
    SignUpData.append("email", Email);
    SignUpData.append("password", Password);
    SignUpData.append("confirmPassword", confirmPassword);

    const signReq = {
        method: "POST",
        body: SignUpData,
    };
    
    const URL = "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

    fetch(URL, signReq)
        .then((response)=> response.json())
        .then((result)=>{
            console.log(result);
            console.log(result.status);
            if(result.status == "success"){
                swal.fire({
                    icon: "success",
                    text: `${result.message}`,
                    confirmButtonText: "ok",
                  }) 
            setTimeout(()=>{
                location.href= "./index.html";
            }, 5000);
            }
            else{
                let errorMessage = "Registration Unsuccessful!"; 
          if (result.message) {
            const keys = Object.keys(result.message);
            const firstErrorKey = keys[0];
            if (result.message[firstErrorKey].length > 0) {
              errorMessage = result.message[firstErrorKey][0];
            }
          }
          swal.fire({
            icon: "error",
            text: errorMessage,
            confirmButtonText: "OK",
          });
          signUp.innerText = "Sign Up";
          signUp.classList.remove("pulse"); 
        }
        })
    


   }

})

