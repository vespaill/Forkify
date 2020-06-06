import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * Get input query from UI, make an API call, and render the results on UI.
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

        // 4) Search for recipes.
        await state.search.getResults();

        // 5) Render results on UI.
        clearLoader();
        searchView.renderResults(state.search.result);
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


