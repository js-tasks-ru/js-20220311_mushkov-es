/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
 const fruits = {
    apple: 2,
    orange: 4,
    banana: 3
};
const newObj = {};
export const pick = (obj, ...fields) => {
    return Object.fromEntries(Object.entries(obj).filter(elem => fields.includes(elem[0])))
   
};

pick(fruits, 'apple', 'orange')
