import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {
    search: null,
    recipe: null,
    shoppingList: null,
    likedRecipes: []
};

/**
 * SEARCH CONTROLLER
 * Gets input query from UI, makes an API call, and renders the results on UI.
 */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2) Create new search object and add it to state.
        state.search = new Search(query);

        // 3) Prepare the UI for results.
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        try {
            // 4) Search for recipes.
            await state.search.getResults();

            // 5) Render results on UI.
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('Something went wrong with the search...');
            clearLoader();
        }
    }
}

/**
 * Call search controller on form submittion.
 */
elements.searchForm.on('submit', e => {
    e.preventDefault();
    controlSearch();
});

/**
 * Handle pagination when clicking search results page buttons.
 */
elements.searchResultPages.on('click', e => {
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        /* Prepare the UI for changes */
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        /* Highlight new recipe object */
        if (state.search) searchView.highlightSelected(id);

        /* Create new recipe object */
        state.recipe = new Recipe(id);

        try {
            /* Get recipe data */
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            /* Calculate servings and time */
            state.recipe.calcServings();
            state.recipe.calcTime();

            /* Render the recipe */
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            console.log(state.recipe);
        } catch (error) {
            alert('Error processing recipe');
        }
    }
}

/**
 * Same event handler 'controlRecipe' will be used for multiple triggers:
 * 'hashchange' and 'load'
 */
['hashchange', 'load'].forEach(event =>
    elements.window.on(event, controlRecipe)
);
