import axios from 'axios'
import { key } from '../config'

const normalizeUnit = unit => {
    unit = unit.toLowerCase();
    switch (unit) {
        case 'ounce':
        case 'ounces':
            return 'oz'
        case 'milliliter':
        case 'milliliters':
            return 'ml';
        case 'cups':
            return 'cup';
        case 'gram':
        case 'grams':
            return 'g';
        case 'kilogram':
        case 'kilograms':
            return 'kg';
        case 'tbsps':
        case 'tablespoon':
        case 'tablespoons':
            return 'tbsp';
        case 'tsps':
        case 'teaspoon':
        case 'teaspoons':
            return 'tsp';
        default:
            return unit;
    }
}

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    /**
     * Retrieves recipe data from the spoonacular API.
     */
    async getRecipe() {
        try {
            const result = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}`);
            this.title = result.data.title;
            this.author = result.data.creditsText;
            this.image = result.data.image;
            this.url = result.data.sourceUrl;
            this.ingredients = result.data.extendedIngredients;
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    /**
     * Calculates a very rough estimate for the duration of this recipe by
     * assuming that we need 15 min for every 3 ingredients.
     */
    calcTime() {
        const numIngredients = this.ingredients.length;
        const periods = Math.ceil(numIngredients / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        this.ingredients = this.ingredients.map(element => {
            let count = element.measures.metric.amount;
            let unit = element.measures.metric.unitShort;

            unit = normalizeUnit(unit);

            if (unit === 'ml' || unit === 'g' || unit === 'kg')
                count = Math.ceil(count)

            return {
                count,
                unit,
                ingredient: element.name
            };
        });
    }
}
