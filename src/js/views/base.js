import $ from 'jquery';

export const elements = {
    searchForm: $('.search'),
    searchInput: $('.search__field'),
    searchResults: $('.results'),
    searchResultList: $('.results__list'),
    searchResultPages: $('.results__pages'),
    window: $(window)
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    $(parent).append(loader);
};

export const clearLoader = () => {
    const $loader = $(`.${elementStrings.loader}`);
    if ($loader) $loader.remove();
};
