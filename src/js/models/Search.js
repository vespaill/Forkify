import axios from 'axios';
import { key } from '../config'

export default class Search {
    constructor(query) {
        this.query = query;
    }

    /**
     * @param {Boolean} addRecipeInformation If set to true, you get nutritional
     * information about each recipes returned.
     * @param {Number} num The number of expected results (between 1 and 100).
     */
    async getResults(addRecipeInformation = true, num = 12) {
        let url = 'https://api.spoonacular.com/recipes/complexSearch';
        url += `?apiKey=${key}`;
        url += `&query=${this.query}`;
        url += `&addRecipeInformation=${addRecipeInformation}`;
        url += `&number=${num}`;

        try {
            const response = await axios(url);
            this.result = response.data.results;
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
}
