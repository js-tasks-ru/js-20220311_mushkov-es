/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(str, target = '') {
    let trimStr = '';
    let counter = 0;
    
    for ( let i = 0; i < str.length; i++) {
        if (str === undefined) return str;
        if (target === 0) return '';
        if (target === '') return str;
        if (str[i] !== str[i + 1] && counter < target){
            trimStr += str[i];
        }
        if (str[i] !== str[i + 1] && str[i] === str[i - 1]) {
            counter ++
        }
        if (str[i] === str[i + 1] && counter < target){
            trimStr += str[i];
            counter++
        }
        
        if (counter >= target && str[i] !== str[i + 1]) {
            counter = 0;
            
        }
    }
    return trimStr;
    
    }

