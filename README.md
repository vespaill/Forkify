## Learning Goals

### 1–12. Project overview & setup

-   Nodejs, npm
-   **[Webpack](https://webpack.js.org/)**: [webpack](https://www.npmjs.com/package/webpack), [webpack-cli](https://www.npmjs.com/package/webpack-cli), [webpack dev server](https://webpack.js.org/configuration/dev-server/), [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
-   **[Babel](https://babeljs.io/)**: [@babel/core](https://www.npmjs.com/package/@babel/core), [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env), [babel-loader](https://www.npmjs.com/package/babel-loader)
-   MVC architecture
-   ES6 modules

### 13. Making our first API calls

-   How to use a real-world API like [spoonacular](https://spoonacular.com/food-api/docs).
-   What API keys are and why we need them.

### 14. Building the Search model

-   How to use a simple data model using ES6 classes.

### 15. Building the Search controller

-   The concept of application state.
-   A simple way of implementing state with objects.

### 16–17. Building the Search view

-   Advanced DOM manipulation techniques.
-   How to use ES6 template strings to render entire HTML components.
-   How to create a loading spinner.

### 18. Rendering an AJAX loading spinner

### 19. Implementing search results pagination

-   How to use the `.closest` method for easier event handling.
-   How and why to use `data-*` attributes in HTML5.

### 20. Building the Recipe model

-   Retrieving recipe data from the [spoonacular](https://spoonacular.com/food-api/docs) API and storing it in a Recipe object.

### 21. Building the Recipe controller—part 1

-   How to read data from the page URL.
-   How to respond to the `hashchange` event. This is an event that is triggered every time the current url changes.
-   How to add the same event listener to multiple events.

### 22. Building the Recipe controller—part 2

-   Use array methods like `map`, `slice`, `findIndex`, and `includes`.
-   How and why to use `eval()`.

### 23. Building the Recipe view—part 1

-   Parsing recipe ingredients and normalizing their measurement units.
-   Writing HTML markup to render recipes.

### 24. Building the Recipe view—part 2

-   Using `fraction.js` to format numbers into fraction strings.
-   Highlighting selected items in the search results list.

### 25. Updating Recipe servings

-   Another way of implementing event delegation using the `.matches` method.

### 26. Building the Shopping List model

-   How and why to create unique IDs using an external package like [uniqid](https://www.npmjs.com/package/uniqid).
-   Difference between `Array.slice` and `Array.splice`.
-   More use cases for `Array.findIndex` and `Array.find`.

### 27. Building the Shopping List view

-   Writing HTML markup to render Shopping List items.

### 28. Building the Shopping List controller

-   Adding ingredients to Shopping List.
-   Handling events for deleting and updating Shopping List items.

### 29. Building the Likes model
### 30. Building the Likes controller
### 31. Building the Likes view

### 32. Implementing persistent data with localStorage

-   How to use the `localStorage` API.
-   How to set, get and delete from local storage.

### 33. Wrapping up & final considerations

-   Fix occasional bug concerning update of servings. Fractions for ingredient counts tend to get too long, so round them.

### Making the project even better

-   Implement button to delete all shopping list items.
-   Implement functionality to manually add items to shopping list.
-   Save shopping list data in local storage.
-   Improve the ingredient parsing algorithm.
-   Come up with an algorithm for calculating the amount of servings.
-   Improve error handling.
