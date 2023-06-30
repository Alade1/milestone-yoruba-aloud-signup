function getData() {
    const pagemodal = document.getElementById("pageModal");
    pagemodal.style.display = "flex";
  
    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
    const token = tokenAcquired.token;
  
    const headers = new Headers();
  
    headers.append("Authorization", `Bearer ${token}`);
  
    const request = {
      method: "GET",
      headers: headers,
    };
    const URL = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
  
    const resultData = [];
  
    fetch(URL, request)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
  
        const getCategories = document.getElementById("total-categories");
        getCategories.innerHTML = `${result.total_number_of_categories}`;
  
        const learningMaterials = document.getElementById("learning-materials");
        learningMaterials.innerHTML = `${result.total_number_of_learningmaterial}`;
  
        const TotalSubcategories = document.getElementById("Total-Sub-Categories");
        TotalSubcategories.innerHTML = `${result.total_number_of_categories}`;
  
        const TotalQuiz = document.getElementById("total-quiz");
        TotalQuiz.innerHTML = `${result.total_number_of_quize}` ; 
  
        const getTotalStudents = document.getElementById("total-students");
        getTotalStudents.innerHTML = `${result.total_number_of_students}`;
  
        const getAdminUsername = document.getElementById("adminUsername");
        getAdminUsername.innerHTML = `${result.admin_name}`;
  
        pagemodal.style.display = "none";
      })
      .catch((error) => console.log("error", error));
  }
  getData();
  
// GETTING THE TOP THREE STUDENTS //

const studentData = document.getElementById("top-students");

studentData.addEventListener("click", (event)=>{
    event.preventDefault();
    const studentmodal = document.getElementById("studentModal");
    studentmodal.style.display="block";
    
    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
     const token = tokenAcquired.token;

    const headers = new Headers();
    headers.append("Authorization", `Bearer${token}`);

    const request ={
        method: "GET",
        headers: headers,
    };
    const URL =  "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
    
    const resultData =[];

    fetch(URL, request)
    .then((response) => response.json())
    .then((result)=>{
        console.log(result);

        const getBestStudents = document.getElementById("topThreeScores");

        if(result.length === 0){
            getBestStudents.innerHTML ="No information found";
        }

        result.map((item) => {
            resultData.push(`
              <div class="search-card">
                <div class="card">
                  <p>Name:</p>
                  <p>${item.name}</p>
                </div>
                <div class="card">
                  <p>Email:</p>
                  <p>${item.email}</p>
                </div>
                <div class="card">
                  <p>Phone Number:</p>
                  <p>${item.phone_number}</p>
                </div>
                <div class="card">
                  <p>Position:</p>
                  <p>${item.position}</p>
                </div>
                <div class="card">
                  <p>Total Score:</p>
                  <p>${item.total_score}</p>
                </div>
              </div>
            `);
          });
          
          getBestStudents.innerHTML = resultData.join("");

          studentmodal.classList.add("show");




    })
    .catch((error) => console.log("error", error));

})
