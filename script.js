const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// function defaultFn() {
//   const defaultFood = "chicken";
//   searchFn(defaultFood);
// }
const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", () => {
  const userIn = document.getElementById("searchInput").value.trim();
  if (userIn !== "") {
    searchFn(userIn);
  } else {
    alert("Please enter a recipe name 😉!");
  }
});

document.addEventListener("click", (event) => {
  if (event.target.className === "show-recipe-btn") {
    const rId = event.target.getAttribute("data-id");
    modalFn(rId);
  }
  if (event.target.id === "closeBtn") {
    closeModalFn();
  }
});

// defaultFn();

async function searchFn(query) {
  try {
    const url = `${apiUrl}${query}`;
    const res = await fetch(url);
    const tmp = await res.json();

    if (tmp.meals) {
      showRecpsFn(tmp.meals);
    } else {
      noRecFn();
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

// Function decleration type
function showRecpsFn(r) {
  const recipeContainer1 = document.getElementById("recipeContainer");
  recipeContainer1.innerHTML = "";
  // The slice method will take first 20 recipe from the array and then loops them !
  r.slice(0, 20).forEach((recipe) => {
    const c = document.createElement("div");
    c.classList.add("animate__animated", "animate__fadeIn", "recipe-card");
    c.innerHTML = `
      <h3>${recipe.strMeal}</h3>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <p>${recipe.strArea}</p>
      <p>${recipe.strCategory}</p>
      <button class="show-recipe-btn" data-id="${recipe.idMeal}">Show Recipe</button>
    `;
    recipeContainer1.appendChild(c);
  });
  if (r.length === 1) {
    const card = recipeContainer1.firstChild;
    card.style.margin = "auto";
  }
}

function noRecFn() {
  const recipeContainer1 = document.getElementById("recipeContainer");
  recipeContainer1.innerHTML = "<p>No Recipe found</p>";
}

async function modalFn(recipeId) {
  try {
    const mData = document.getElementById("modalContent");
    mData.innerHTML = "";

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    );
    const data = await res.json();

    const rep = data.meals[0];
    mData.innerHTML = `
      <h2>${rep.strMeal}</h2>
      <h3>Instructions:</h3>
      <p>${formatFn(rep.strInstructions)}</p>
    `;
    document.getElementById("recipeModal").style.display = "block";
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}

function formatFn(instructions) {
  return instructions
    .split("\r\n")
    .filter((instruction) => instruction.trim() !== "")
    .join("<br>");
}

function closeModalFn() {
  document.getElementById("recipeModal").style.display = "none";
}

// c.classList.add("animate__animated", "animate__fadeIn", "recipe-card");

// 1) animate__animated
// This class is part of the Animate.css library.
// When this class is applied to an element, it allows you to use additional animation classes to create effects like fading, sliding, bouncing, etc.

// animate__fadeIn
// In this case, fadeIn means that the element will smoothly transition from being invisible to fully visible.

//recipe-card
// This is likely a custom class defined in your CSS (not part of Animate.css) that styles the recipe card element. The styles associated with this class could include properties like background color, padding, border radius, and other layout settings to make it visually appealing.
