
// // //nav bar
// // const menuLinks = document.querySelectorAll('.menu li a');
// // const checkBox = document.getElementById('check');

// // menuLinks.forEach(link => {
// //   link.addEventListener('click', () => {
// //     checkBox.checked = false; // close menu on link click
// //   });
// // });

// // //----footer----//
// // const form = document.getElementById('newsletter-form');
// // const emailInput = document.getElementById('email');
// // const message = document.getElementById('message');

// // form.addEventListener('submit', function(e) {
// //     e.preventDefault();
// //     const email = emailInput.value.trim();

// //     if (email === '') {
// //         message.textContent = 'Please enter a valid email.';
// //         message.style.color = 'red';
// //         return;
// //     }

// //     let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
// //     if (!subscribers.includes(email)) {
// //         subscribers.push(email);
// //         localStorage.setItem('subscribers', JSON.stringify(subscribers));
// //     }

// //     message.textContent = 'Thank you for subscribing!';
// //     message.style.color = 'green';
// //     emailInput.value = '';

// //     setTimeout(() => {
// //         message.textContent = '';
// //     }, 3000);
// // });

// //nav bar
// const menuLinks = document.querySelectorAll('.menu li a');
// const checkBox = document.getElementById('check');

// menuLinks.forEach(link => {
//   link.addEventListener('click', () => {
//     checkBox.checked = false; // close menu on link click
//   });
// });

// //----footer----//
// const form = document.getElementById('newsletter-form');
// const emailInput = document.getElementById('email');
// const message = document.getElementById('message');

// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     const email = emailInput.value.trim();

//     if (email === '') {
//         message.textContent = 'Please enter a valid email.';
//         message.style.color = 'red';
//         return;
//     }

//     let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
//     if (!subscribers.includes(email)) {
//         subscribers.push(email);
//         localStorage.setItem('subscribers', JSON.stringify(subscribers));
//     }

//     message.textContent = 'Thank you for subscribing!';
//     message.style.color = 'green';
//     emailInput.value = '';

//     setTimeout(() => {
//         message.textContent = '';
//     }, 3000);
// });

// document.addEventListener("DOMContentLoaded", function() {
// // DOM elements
// const recipeGrid = document.getElementById("recipeGrid");
// const searchInput = document.getElementById("searchInput");
// const categoryFilter = document.getElementById("categoryFilter");
// const modal = document.getElementById("recipeModal");
// const modalTitle = document.getElementById("modalTitle");
// const modalImage = document.getElementById("modalImage");
// const ingredientsList = document.getElementById("ingredientsList");
// const stepsList = document.getElementById("stepsList");
// const nutritionBody = document.getElementById("nutritionBody");
// const closeBtn = document.querySelector(".close-btn");

// let recipes = [];

// // // Fetch recipes from JSON file
// fetch("recipes.json")
//     .then(response => response.json())
//     .then(data => {
//         recipes = data;
//         renderRecipes();
//         setupEventListeners();
//     })
//     .catch(error => console.error("Error loading recipes:", error));

// function renderRecipes(recipesToRender = recipes) {
//     recipeGrid.innerHTML = '';

//     if (recipesToRender.length === 0) {
//         recipeGrid.innerHTML = `<p class="no-results">No recipes found</p>`;
//         return;
//     }

//     recipesToRender.forEach(recipe => {
//         const card = document.createElement("div");
//         card.className = "recipe-card";

//         card.innerHTML = `
//             <div class="card-image">
//                 <img src="${recipe.image}" alt="${recipe.title}">
//             </div>
//             <div class="card-content">
//                 <span class="card-category">${recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</span>
//                 <h2 class="card-title">${recipe.title}</h2>
//                 <p class="card-description">${recipe.description}</p>
//                 <button class="view-recipe-btn" data-recipe-id="${recipe.id}">View Recipe</button>
//             </div>
//         `;

//         recipeGrid.appendChild(card);
//     });

//     // Add event listeners to buttons
//     document.querySelectorAll(".view-recipe-btn").forEach(button => {
//         button.addEventListener("click", function() {
//             const recipeId = this.getAttribute("data-recipe-id");
//             showRecipeModal(recipeId);
//         });
//     });
// }


//     function filterRecipes() {
//         const searchTerm = searchInput.value.toLowerCase();
//         const selectedCategory = categoryFilter.value;

//         let filteredRecipes = recipes;

//         if (searchTerm) {
//             filteredRecipes = filteredRecipes.filter(recipe =>
//                 recipe.title.toLowerCase().includes(searchTerm) ||
//                 recipe.description.toLowerCase().includes(searchTerm)
//             );
//         }

//         if (selectedCategory !== "all") {
//             filteredRecipes = filteredRecipes.filter(recipe =>
//                 recipe.category === selectedCategory
//             );
//         }

//         renderRecipes(filteredRecipes);
//     }

//     function setupEventListeners() {
//         searchInput.addEventListener("input", filterRecipes);
//         categoryFilter.addEventListener("change", filterRecipes);

//         closeBtn.addEventListener("click", closeModal);
//         window.addEventListener("click", (e) => {
//             if (e.target === modal) {
//                 closeModal();
//             }
//         });
//     }
    

//     function showRecipeModal(recipeId) {
//         const recipe = recipes.find(r => r.id == recipeId);

//         if (recipe) {
//             modalTitle.textContent = recipe.title;
//             modalImage.src = recipe.image;
//             modalImage.alt = recipe.title;

//             ingredientsList.innerHTML = '';
//             recipe.ingredients.forEach(ingredient => {
//                 const li = document.createElement("li");
//                 li.textContent = ingredient;
//                 ingredientsList.appendChild(li);
//             });

//             stepsList.innerHTML = '';
//             recipe.steps.forEach(step => {
//                 const li = document.createElement("li");
//                 li.textContent = step;
//                 stepsList.appendChild(li);
//             });

//             nutritionBody.innerHTML = '';
//             recipe.nutrition.forEach(nutrient => {
//                 const tr = document.createElement("tr");
//                 tr.innerHTML = `
//                     <td>${nutrient.name}</td>
//                     <td>${nutrient.amount}</td>
//                     <td>${nutrient.dailyValue}</td>
//                 `;
//                 nutritionBody.appendChild(tr);
//             });

//             modal.style.display = "block";
//             document.body.style.overflow = "hidden";
//         }
//     }

//     function closeModal() {
//         modal.style.display = "none";
//         document.body.style.overflow = "auto";
//     }
// });
document.addEventListener("DOMContentLoaded", function() {
    const recipeGrid = document.getElementById("recipeGrid");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    const modal = document.getElementById("recipeModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const ingredientsList = document.getElementById("ingredientsList");
    const stepsList = document.getElementById("stepsList");
    const nutritionBody = document.getElementById("nutritionBody");
    const closeBtn = document.querySelector(".close-btn");

    let recipes = [];

    // Load recipes from JSON
    fetch("recipes.json")
        .then(res => res.json())
        .then(data => {
            recipes = data;
            renderRecipes();
        })
        .catch(err => console.error(err));

    // Render recipe cards
    function renderRecipes(list = recipes) {
        recipeGrid.innerHTML = '';
        if(list.length === 0){
            recipeGrid.innerHTML = "<p>No recipes found</p>";
            return;
        }

        list.forEach(recipe => {
            const card = document.createElement("div");
            card.className = "recipe-card";
            card.innerHTML = `
                <div class="card-image"><img src="${recipe.image}" alt="${recipe.title}"></div>
                <div class="card-content">
                    <span class="card-category">${recipe.category}</span>
                    <h2 class="card-title">${recipe.title}</h2>
                    <p class="card-description">${recipe.description}</p>
                    <button class="view-recipe-btn">View Recipe</button>
                </div>
            `;
            recipeGrid.appendChild(card);

            card.querySelector(".view-recipe-btn").addEventListener("click", () => openModal(recipe));
        });
    }

    // Open modal
    function openModal(recipe) {
        modalTitle.textContent = recipe.title;
        modalImage.src = recipe.image;
        modalImage.alt = recipe.title;

        ingredientsList.innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join('');
        stepsList.innerHTML = recipe.steps.map(s => `<li>${s}</li>`).join('');
        nutritionBody.innerHTML = `<tr><th>Nutrient</th><th>Amount</th><th>% Daily Value</th></tr>` +
            recipe.nutrition.map(n => `<tr><td>${n.name}</td><td>${n.amount}</td><td>${n.dailyValue}</td></tr>`).join('');

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", e => {
        if(e.target === modal) closeModal();
    });
    window.addEventListener("keydown", e => {
        if(e.key === "Escape") closeModal();
    });
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Filter/search
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const category = categoryFilter.value.toLowerCase();
        const filtered = recipes.filter(r =>
            r.title.toLowerCase().includes(query) &&
            (category === 'all' || r.category.toLowerCase() === category)
        );
        renderRecipes(filtered);
    });
    categoryFilter.addEventListener("change", () => searchInput.dispatchEvent(new Event("input")));
});

//newsletter
document.getElementById("newsletter-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim().toLowerCase(); // normalize email
    const message = document.getElementById("message");

    // Get saved emails from localStorage (empty array if none)
    let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

    // Check if email already exists
    if (subscribers.includes(email)) {
        message.textContent = "Error: This email is already subscribed!";
        message.style.color = "red";
    } else {
        // Save new email
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));
        message.textContent = "Subscription successful!";
        message.style.color = "green";
        emailInput.value = ""; // clear input
    }
});
