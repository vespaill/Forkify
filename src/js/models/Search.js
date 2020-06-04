import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const url = 'https://api.spoonacular.com/recipes/search';
        const key = '3805dd74823040bbbd3330813abef7ed';

        try {
            const response = await axios(
                `${url}?apiKey=${key}&query=${this.query}`
            );
            this.result = response.data.results;
            // console.log(this.result);
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
