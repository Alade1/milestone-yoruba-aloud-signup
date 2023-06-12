const signIn = document.getElementById("signIn");
signIn.innerText="Sign In";

signIn.addEventListener("click", (event)=>{
    event.preventDefault();
    const Email = document.getElementById("email");
    const Password = document.getElementById("password");
     signIn.innerText ="Loading...";
     signIn.classList.add("pulse");

    if (
        Email === "  " || Password === " "
    ){
        swal.fire({
            icon: "info",
            text: "All fields are required",
            confirmButtonText: "ok",
          })  
          signIn.innerText = "Sign In";
          signIn.classList.remove ("pulse");

    }
    else{
        const SignInData = new FormData();
        signIn.append("Email", Email);
        signIn.append("Password", Password);

        const signReq = {
            method: "POST",
            body: SignInData,
        };

        const URL ="https://pluralcodesandbox.com/yorubalearning/api/admin_login";

        fetch(URL, signReq)
        .then((response)=>response.json())
        .then((result)=>{
            console.log(result);
            console.log(result.status);

            localStorage.setItem("adminObj", JSON.stringify(result));

            const getAdminObject =localStorage.getItem("adminObj");
            const adminObj = JSON.parse(getAdminObject);
            if(adminObj.hasOwnProperty("Email")){
                location.href="./dashboard.html";
            }
            else{
                Swal.fire({
                    icon :"Warning",
                    text: "Login Unsuccessful",
                    confirmButtonColor : "#2D85DE",


                });
                signIn.innerText = "Sign In";
                signIn.classList.remove ("pulse");

            }

        } )




    }

    
})