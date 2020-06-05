import { elements } from './base';

export const getInput = () => elements.searchInput.val();

export const clearInput = () => {
    elements.searchInput.val('');
};

export const clearResults = () => {
    elements.searchResultList.empty();
};


const limitRecipeTitle = (title, limit = 17) => {
    if (title.length <= limit)
        return title;

    const newTitle = [];
    title.split(' ').reduce((acc, cur) => {
        if (acc + cur.length <= limit)
            newTitle.push(cur);
        return acc + cur.length;
    }, 0);

    return `${newTitle.join(' ')} ...`;
};

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

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};
