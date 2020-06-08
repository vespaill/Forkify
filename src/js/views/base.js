import $ from 'jquery';

/**
 * Storage of JQuery HTMLElements.
 */
export const elements = {
    window: $(window),
    searchForm: $('.search'),
    searchInput: $('.search__field'),
    searchResults: $('.results'),
    searchResultList: $('.results__list'),
    searchResultPages: $('.results__pages'),
    recipe: $('.recipe'),
    shopping: $('.shopping__list'),
    likesMenu: $('.likes__field'),
    likesList: $('.likes__list')
};

export const elementStrings = {
    loader: 'loader'
};

/**
 * Renders a loader icon as a child of the given parent element.
 * @param {JQuery<HTMLElement>} parent
 */
export const renderLoader = $parent => {
    const markup = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    $parent.prepend(markup);
};

/**
 * Removes the loader icon from the UI.
 */
export const clearLoader = () => {
    const $loader = $(`.${elementStrings.loader}`);
    if ($loader) $loader.remove();
};
