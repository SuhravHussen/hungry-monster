const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', MealList);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list By Input
function MealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}" onclick="getMealRecipe('${meal.idMeal}')">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(id){
fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
  .then(response => response.json())
  .then(json =>mealIngredients(json.meals))
}

// create a modal
function mealIngredients(meal){
    meal = meal[0];
    let html = `
     <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <h2 class = "recipe-title">${meal.strMeal}</h2>
       
        <div class = "recipe-instruct">
            <h3>ingredients:</h3>
           <ul>
           <li>${meal.strIngredient1}</li>
           <li>${meal.strIngredient2}</li>
           <li>${meal.strIngredient3}</li>
           <li>${meal.strIngredient4}</li>
           <li>${meal.strIngredient5}</li>
           <li>${meal.strIngredient6}</li>
           <li>${meal.strIngredient7}</li>
           <li>${meal.strIngredient8}</li>
           <li>${meal.strIngredient9}</li>
           <li>${meal.strIngredient10}</li>
           </ul>
        </div>
    `;
    
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}