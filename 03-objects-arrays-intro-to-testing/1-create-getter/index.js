/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
 const product = {
    category: {
    title: 'Goods'
    }
 }
export function createGetter(path) {
    let [a, b] = path.split('.');
    return (obj) => {
        return obj[a][b];
    }
}
const getter = createGetter('category.title')
console.log(getter(product))
