import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * Global state of the app
 * - 'search' object
 * - current 'recipe' object
 * - Shopping 'list' object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 * Gets an input query from the UI, uses the query to fetch recipes from an API,
 * and renders the matching results on the UI.
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
 * Call search controller on form submission.
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
 * Gets a recipe id from the window hash, uses the id to fetch data from an API
 * for a that particular recipe, and renders the recipe details on the UI.
 */
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');

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
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );
        } catch (error) {
            alert('Error processing recipe');
        }
    }
};

/**
 * Use the same event handler 'controlRecipe' for multiple triggers:
 * 'hashchange' and 'load'
 */
['hashchange', 'load'].forEach(event =>
    elements.window.on(event, controlRecipe)
);

/**
 * LIST CONTROLLER
 * Takes the ingredients from the current state recipe and renders them on
 * a seperate list in the UI.
 */
const controlList = () => {
    /* Create a new list IF there is none yet. */
    if (!state.list) state.list = new List();

    /* Add each ingredient to the state's list and render the list on UI. */
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

/**
 * Handle deleting and updating list item events.
 */
elements.shopping.on('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    /* Handle the detele button. */
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        /* Delete from state. */
        state.list.deleteItem(id);

        /* Delete from UI. */
        listView.deleteItem(id);

    /* Handle the count update. */
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
});

/**
 * LIKE CONTROLLER
 * Allows the user to like or unlike the current recipe. Liked recipes are
 * stored in a list, making them easily accessible in the future. Unliking
 * recipes deletes them from this list.
 */
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();

    const curID = state.recipe.id;

    /* User has NOT yet liked the current recipe. */
    if (!state.likes.isLiked(curID)) {

        /* Add like to the state. */
        const newLike = state.likes.addLike(
            curID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.image
        );

        /* Toggle the like button. */
        likesView.toggleLikeBtn(true);

        /* Add like to UI list. */
        likesView.renderLike(newLike);

    /* User HAS liked the current recipe. */
    } else {

        /* Remove like from the state. */
        state.likes.deleteLike(curID);

        /* Toggle the like button. */
        likesView.toggleLikeBtn(false);

        /* Remove like from UI list. */
        likesView.deleteLike(curID);

    }
    likesView.toggleLikeMenu(state.likes.numLikes);
};

/**
 * Restore liked recipes from localStorage on page load.
 */
elements.window.on('load', () => {
    state.likes = new Likes();

    /* Restore likes. */
    state.likes.readStorage();

    /* Toggle like menu button. */
    likesView.toggleLikeMenu(state.likes.numLikes);

    /* Render the existing likes. */
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

/**
 * Handle current recipe button clicks.
 */
elements.recipe.on('click', e => {
    /* Decrease servings button is clicked. */
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {

        /* Avoid negative servings. */
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    /* Increase servings button is clicked. */
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    /* Add ingredients to shopping list button is clicked. */
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();

    /* Like (heart) recipe button is clicked. */
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});
