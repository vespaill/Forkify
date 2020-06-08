import { elements } from './base';
import $ from 'jquery';

/**
 * Gets the current value in the search field input.
 */
export const getInput = () => elements.searchInput.val()

/**
 * Clears the text in the search field input.
 */
export const clearInput = () => {
    elements.searchInput.val('');
};

/**
 * Removes all list items and pagination buttons in the search results list.
 */
export const clearResults = () => {
    elements.searchResultList.empty();
    elements.searchResultPages.empty();
};

export const highlightSelected = id => {
    $('.results__link').removeClass('results__link--active');
    $(`a[href="#${id}"]`).addClass('results__link--active');
}

/**
 * Returns a truncated version of a string by cutting off words at the end in
 * order to satisfy a length limit.
 * @param {String} title A string to truncate.
 * @param {Number} limit Maximum number of characters title is allowed to have.
 */
const limitRecipeTitle = (title, limit = 17) => {
    /* title string does not exceed length limit, simply return it. */
    if (title.length <= limit)
        return title;

    /* Build up a newTitle, word by word, from the orignal title. */
    const newTitle = [];
    title.split(' ').reduce((acc, cur) => {
        /* Keep pushing words, so long as the limit length is not exceeded. */
        if (acc + cur.length <= limit)
            newTitle.push(cur);
        return acc + cur.length;
    }, 0);

    /* Return truncated title. */
    return `${newTitle.join(' ')} ...`;
};

/**
 * Creates an 'li' HTML element, populated with data from a recipe object, and
 * appends it to the search-result list.
 * @param {Object} recipe Recipe to render.
 * @param {String} recipe.id Unique identifier for the recipe.
 * @param {String} recipe.image URL of the recipe's image.
 * @param {String} recipe.title Title of the recipe.
 * @param {String} recipe.creditsText Author of the recipe.
 */
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.id}">
                <figure class="results__fig">
                    <img src="${recipe.image}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.creditsText}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultList.append(markup);
};

/**
 * Returns markup for a pagination button.
 * @param {Number} page Current page.
 * @param {('prev' | 'next')} type Type of button .
 */
const createButton = (page, type) => {
    let pageNumber, iconArrowDirection;
    if (type === 'prev') {
        pageNumber = page - 1;
        iconArrowDirection = 'left';
    } else if (type === 'next'){
        pageNumber = page + 1;
        iconArrowDirection = 'right';
    }

    return `
        <button class="btn-inline results__btn--${type}" data-goto=${pageNumber}>
            <span>Page ${pageNumber}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${iconArrowDirection}"></use>
            </svg>
        </button>
    `;
}

/**
 * Renders pagination buttons.
 * @param {Number} page Current page.
 * @param {Number} numResults Total number of results.
 * @param {Number} resultPerPage Number of results to display per page.
 */
const renderButtons = (page, numResults, resultPerPage) => {
    const pages = Math.ceil(numResults / resultPerPage);
    let button;

    if (page === 1 && pages > 1) {
        /* Only next-page button */
        button = createButton(page, 'next');
    } else if (page < pages) {
        /* Both buttons */
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        /* Only previous-page button */
        button = createButton(page, 'prev');
    }
    elements.searchResultPages.append(button);
}

/**
 * Renders a list of recipe items in the search-result list. The list is divided
 * into navigable pages.
 * @param {Object[]} recipes List of recipes to render.
 * @param {String} recipes[].id Unique identifier for the recipe.
 * @param {String} recipes[].image URL of the recipe's image.
 * @param {String} recipes[].title Title of the recipe.
 * @param {String} recipes[].creditsText Author of the recipe.
 * @param {Number} page Number of the page we want to start at.
 * @param {Number} resultsPerPage Number of results to display per page.
 */
export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    /* Render results of current page */
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    /* Render pagination buttons */
    renderButtons(page, recipes.length, resultsPerPage);
}
