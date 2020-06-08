export default class Likes {
    constructor() {
        this.likes = [];
    }

    /**
     * Creates a new like object and adds it to the likes array.
     * @param {String} id Unique identifier for the liked recipe.
     * @param {String} title Title of the liked recipe.
     * @param {String} author Author of the liked recipe.
     * @param {String} image image URL for the liked recipe.
     */
    addLike(id, title, author, image) {
        const like = { id, title, author, image };
        this.likes.push(like);
        return like;
    }

    /**
     * Removes a recipe from the likes array.
     * @param {String} id Unique identifier of the recipe to remove.
     */
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }

    /**
     * Determine whether a recipe has been liked.
     * @param {String} id Unique identifier of the recipe to check.
     */
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    get numLikes() {
        return this.likes.length;
    }
}