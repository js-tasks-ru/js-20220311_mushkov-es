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
    const pathArray = path.split('.');
    return obj => {
      let result = obj;
  
      for (const item of pathArray) {
        if (result === undefined) break;
  
        result = result[item];
        
      }
      return result;
    };
  };
const getter = createGetter('categori.title')
console.log(getter(product))


