const searchform = document.querySelector(".search-input");
const search = document.querySelector("#search");
const mealTitle = document.querySelector(".card-title");
const mealImg = document.querySelector(".card-img img");
const tags = document.querySelector(".tags");
const recipe = document.querySelector(".recipe");
const showRecipe = document.querySelectorAll(".showIns");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchform.addEventListener("submit", async (e) => {
  e.preventDefault();
  tags.innerHTML = "";
  recipe.lastElementChild.innerHTML = "";
  let inputVal = e.target.elements.search.value;
  if (!inputVal) {
    alert("Enter a valid meal!!");
    return;
  }
  let meal;
  await useFetch(inputVal).then((res) => {
    meal = res;
  });

  if (!meal) {
    alert("Not Found");
    return;
  }
  let {
    strArea,
    strCategory,
    strTags,
    strMeal,
    strMealThumb,
    strInstructions,
  } = meal;
  mealTitle.innerText = strMeal;
  mealImg.src = strMealThumb + "/preview";

  //tags
  let tagsArr = [strArea, strCategory, strTags];
  tagsArr.forEach((e) => {
    let tagEle = document.createElement("span");
    tagEle.classList =
      "bg-slate-50 bg-opacity-20 rounded-xl p-1 px-2 text-white";
    tagEle.innerText = e;
    if (e) tags.append(tagEle);
  });

  //getting ingredients
  const arr = [];
  for (let i = 1; i <= 20; i++) {
    if (!meal[`strMeasure` + i] || !meal[`strIngredient` + i]) break;
    arr.push(
      `<li>${meal[`strIngredient` + i]} / ${meal[`strMeasure` + i]} </li>`
    );
  }

  //show recipe and ingredients
  showRecipe.forEach((e) =>
    e.addEventListener("click", (e) => {
      console.log("clicked");
      recipe.lastElementChild.innerHTML =
        e.target.id === "ing" ? `<ul>${arr.join("")}</ul>` : strInstructions;
      recipe.classList.toggle("hidden");
    })
  );
  document.querySelector("#card").classList.remove("hidden");
});

function useFetch(searchQuery) {
  return fetch(url + searchQuery)
    .then((res) => res.json())
    .then((obj) => {
      return obj.meals[0];
    })
    .catch((err) => console.log(err));
}
