import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    /**
     * Adds a new ingredient to the list.
     * @param {Number} count The ingredient's quantity.
     * @param {String} unit The ingredient's measurement unit.
     * @param {String} ingredient The ingredient's name.
     */
    addItem(count, unit, ingredient) {
        const item = { id: uniqid(), count, unit, ingredient };
        this.items.push(item);
        return item;
    }

    /**
     * Deletes an ingredient from the list.
     * @param {String} id The id of the ingredient to delete.
     */
    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }

    /**
     * Updates the count of an ingredient in the list.
     * @param {String} id The id of the ingredient to update.
     * @param {Number} newCount The new count number for the ingredient.
     */
    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}
