
document.getElementById("getRecipeBtn").addEventListener("click", function() {
    let ingredients = document.getElementById("ingredients").value;

    if (!ingredients) {
        alert("Please enter some ingredients.");
        return;
    }

    const url = `http://localhost:8080/recipeSuggestion?ingredients=${encodeURIComponent(ingredients)}`;
    console.log("Sending request to:", url);


    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);

            if (data && data.RecipeSuggestion && data.RecipeSuggestion.length > 0) {
                document.getElementById("recipeResponse").textContent = data.RecipeSuggestion[0].message.content;
            } else {
                document.getElementById("recipeResponse").textContent = "No suggestions available. Please try again.";
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error);
            document.getElementById("recipeResponse").textContent = `An error occurred: ${error.message}. Please try again later.`;
        });
});
