import { elements } from './base';

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
 * Removes all items in the search results list.
 */
export const clearResults = () => {
    elements.searchResultList.empty();
};

/**
 * Returns a truncated version of a string by cutting off words at the end in
 * order to satisfy a length limit.
 * @param {*} title A string to truncate.
 * @param {*} limit A number to use as the limit of characters that title is
 * allowed to have.
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
 * @param {*} recipe An object containing an id number, an image url string, a
 * title string and creditsText string.
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
 * Renders a list of recipe items in the search-result list.
 * @param {*} recipes an array of recipe objects.
 */
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};
