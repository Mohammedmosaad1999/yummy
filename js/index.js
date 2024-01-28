const listUnstyled = document.querySelector('.list-unstyled');
const navTab = document.querySelector('.nav-tab'); 
const navHeader = document.querySelector('.nav-header');
const openCloseIcon = document.querySelector('.open-close-icon');
const sideNavMenu = document.querySelector('.side-nav-menu');
const searchContainer = document.querySelector('#searchContainer');


function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0,
    }, 500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    $(".links li").animate({
      top: 0},500)

    
}

function closeSideNav() {
    $(".side-nav-menu").animate({
        left: "-256px",
    }, 500)
    $(".open-close-icon").removeClass("fa-x");
    $(".open-close-icon").addClass("fa-align-justify");
    $(".links li").animate({
      top: 300},500)
}
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
      closeSideNav()
  } else {
      openSideNav()
  }})
 
 function showSearchInputs() {
  rowData.innerHTML = `
<div class="row py-4">
    <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>
</div>`

 }

 async function getCategories() {
    rowData.innerHTML = ""
    await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
        data.categories.forEach(category => {
            rowData.innerHTML += `
            <div class="col-md-3">
                <div onclick="getCategoryMeals('${category.strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${category.strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${category.strCategory}</h3>
                    </div>
                </div>
            </div>
            `
        })})}

  async function getArea() {
    rowData.innerHTML = ""
    await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then(res => res.json())
    .then(data => {
        data.meals.forEach(meal => {
            rowData.innerHTML += `
            <div class="col-md-3">
                <div onclick="getAreaMeals('${meal.strArea}')" class="position-relative overflow-hidden rounded-2 cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${meal.strArea}</h3>
                </div>
            </div>
            `
        })})}      


        async function getIngredients() {
            rowData.innerHTML = ""
            await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
            .then(res => res.json())
            .then(data => {
                data.meals.forEach(meal => {
                    rowData.innerHTML += `
                    <div class="col-md-3">
                        <div onclick="getIngredientMeals('${meal.strIngredient}')" class="position-relative overflow-hidden rounded-2 cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>        
                        <h3>${meal.strIngredient}</h3>
                        </div>
                    </div>
                    `
        
        
                })})
        }

         function contactUs() {
          rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
          <div class="container w-75 text-center">
              <div class="row g-4">
                  <div class="col-md-6">
                      <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                      <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Special characters and numbers not allowed
                      </div>
                  </div>
                  <div class="col-md-6">
                      <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                      <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Email not valid *exemple@yyy.zzz
                      </div>
                  </div>
                  <div class="col-md-6">
                      <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                      <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Enter valid Phone Number
                      </div>
                  </div>
                  <div class="col-md-6">
                      <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                      <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Enter valid age
                      </div>
                  </div>
                  <div class="col-md-6">
                      <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                      <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Enter valid password *Minimum eight characters, at least one letter and one number:*
                      </div>
                  </div>
                  <div class="col-md-6">
                      <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                      <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Enter valid repassword 
                      </div>
                  </div>
              </div>
              <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
          </div>
      </div> `
          
      }
     
function displayMeals(meals) {
    rowData.innerHTML = ""
    meals.forEach(meal => {
        rowData.innerHTML += `
        <div class="col-md-3">
            <div onclick="getMealById(${meal.idMeal})" class="position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${meal.strMealThumb}" alt="">
                <h3>${meal.strMeal}</h3>
            </div>
        </div>
        `
    })
}

async function getAreaMeals (area) {
 await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  .then(res => res.json())
  .then(data => displayMeals(data.meals))
}
 async function getCategoryMeals(category) {
   await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}

async function getIngredientMeals(ingredient) {
   await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}

async function getMealById(id) {
 await   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

function displayMealDetails(meal) {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break
        }
    }
  }

  async function getMealsBySearch(term) {
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
  }

  async function searchByName(term) {
    if (term.length > 5) {
        await getMealsBySearch(term)
    }
  }
  
  async function searchByFLetter(term) {
    if (term.length > 0) {
        await getMealsBySearch(term)
    }
  }















  
