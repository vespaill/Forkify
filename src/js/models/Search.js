import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    /**
     *
     * @param {*} num The number of expected results (between 1 and 100).
     */
    async getResults(num = 10) {
        const url = 'https://api.spoonacular.com/recipes/complexSearch';
        const key = '3805dd74823040bbbd3330813abef7ed';

        try {
            const response = await axios(
                `${url}?apiKey=${key}&query=${this.query}&addRecipeInformation=true&number=${num}`
            );
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
