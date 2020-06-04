import axios from 'axios';
const key = '3805dd74823040bbbd3330813abef7ed';

async function getRecipes(query) {
    const url = 'https://api.spoonacular.com/recipes/search';

    try {
        const response = await axios(`${url}?apiKey=${key}&query=${query}`);
        let recipes = response.data.results;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }
}

getRecipes('pizza');
