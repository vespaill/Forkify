import Search from './models/Search';

const search = new Search('pizza');
console.log(search);

search.getResults().then(() => console.log(search.result));
