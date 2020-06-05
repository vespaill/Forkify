import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    /**
     * @param {*} addRecipeInformation If set to true, you get nutritional information about each recipes returned.
     * @param {*} num The number of expected results (between 1 and 100).
     */
    async getResults(addRecipeInformation = true, num = 10) {
        let url = 'https://api.spoonacular.com/recipes/complexSearch';
        const key = '3805dd74823040bbbd3330813abef7ed';

        url += `?apiKey=${key}`;
        url += `&query=${this.query}`;
        url += `&addRecipeInformation=${addRecipeInformation}`;
        url += `&number=${num}`;

        try {
            const response = await axios(url);
            this.result = response.data.results;
            console.log(this.result);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    // async function getRecipeById(id) {
    //     const url = 'https://api.spoonacular.com/recipes';
    //     const response = await axios(
    //         `${url}/${id}/ingredientWidget.json?apiKey=${key}`
    //     );
    // }
}
