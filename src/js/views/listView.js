import { elements } from './base';
import $ from 'jquery'

export const renderItem = item => {
    elements.shopping.append(`
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `);
};

export const deleteItem = id => {
    $(`[data-itemid="${id}"]`).remove();
};
