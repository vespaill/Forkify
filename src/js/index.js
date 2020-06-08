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
window.state = state;

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
    // console.log('recipe id:', id);

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
            // console.log(state.recipe);
        } catch (error) {
            alert('Error processing recipe');
        }
    }
};

/**
 * Same event handler 'controlRecipe' will be used for multiple triggers:
 * 'hashchange' and 'load'
 */
['hashchange', 'load'].forEach(event =>
    elements.window.on(event, controlRecipe)
);

/**
 * LIST CONTROLLER
 */
const controlList = () => {
    /* Create a new list IF there is none yet. */
    if (!state.list) state.list = new List();

    /* Add each ingredient to state's list and render on UI. */
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

/**
 * Handle delete and update list item events.
 */
elements.shopping.on('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    /* Handle the detele button */
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        /* Delete from state */
        state.list.deleteItem(id);

        /* Delete from UI */
        listView.deleteItem(id);

    /* Handle the count update */
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
});

/**
 * LIKE CONTROLLER
 */
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.numLikes);
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();

    const curID = state.recipe.id;

    /* User has NOT yet liked current recipe. */
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
        console.log(state.likes);

    /* User HAS liked current recipe. */
    } else {

        /* Remove like from the state. */
        state.likes.deleteLike(curID);

        /* Toggle the like button. */
        likesView.toggleLikeBtn(false);

        /* Remove like from UI list. */
        likesView.deleteLike(curID);

    }
    likesView.toggleLikeMenu(state.likes.numLikes);
    console.log(state.likes.likes);

};

/**
 * Handle recipe button clicks.
 */
elements.recipe.on('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        /* Decrease button is clicked. */
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        /* Increase button is clicked. */
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        /* Add ingredients to shopping list. */
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        /* Like controller */
        controlLike();
    }
    // console.log('servings', state.recipe.servings);
});
