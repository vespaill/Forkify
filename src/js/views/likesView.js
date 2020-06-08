import { elements } from './base';
import $ from 'jquery';
import { limitRecipeTitle } from './searchView';

/**
 * Toggles the icon in the like button between either a whole heart or just the
 * outline of a heart.
 * @param {Boolean} isLiked Whether the current recipe is liked or not.
 */
export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    $('.recipe__love use').attr('href', `img/icons.svg#${iconString}`);
};

/**
 * Hides the Likes Menu if there are no liked recipes. Otherwise, makes the
 * Likes Menu visible.
 * @param {Number} numLikes Total currently liked recipes.
 */
export const toggleLikeMenu = numLikes => {
    elements.likesMenu.css('visibility', numLikes > 0? 'visible' : 'hidden');
};

/**
 * Renders a new liked recipe on the Likes list in the UI.
 * @param {Object} like like recipe to render.
 * @param {String} like.id Unique identifier for the liked recipe to render.
 * @param {String} like.image image URL for the liked recipe.
 * @param {String} like.title Title of the liked recipe.
 * @param {String} like.author Author of the liked recipe.
 */
export const renderLike = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.image}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.append(markup);
};

/**
 * Removes a liked recipe from the Likes list in the UI.
 * @param {String} id Unique identifier for the liked recipe to remove.
 */
export const deleteLike = id => {
    /* Attribute Contains Selector [name*="value"] */
    $(`.likes__link[href*="${id}"]`).parent().remove();
}
