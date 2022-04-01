export default class SortableTable {
    element;
    subElements = {};
      
    constructor(headerConfig = [], data = []) {  
      this.headerConfig = headerConfig;
      this.data = data;
      this.render()

    }


  getHeaderTable() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
    ${this.headerConfig.map(elem => `<div class="sortable-table__cell" data-id="${elem.id}" data-sortable="${elem.sortable}" data-order="asc">
    <span>${elem.title}</span>
    <span data-element="arrow" class="sortable-table__sort-arrow">
    <span class="sort-arrow"></span>
    </span></div>` ).join('')}</div>`
  }


  getTableBody() {
    return  `<div data-element="body" class="sortable-table__body">
    ${this.getTableRows(this.data)}</div>`
  }

  getTableRows(data) {
    return data.map(elem => {
      return `<a href="/products/${elem.id}" class="sortable-table__row">
    ${this.getTableCells(elem)}
    </a>`
    }).join('')
  }


  getTableCells(elem) {
    const cells = this.headerConfig.map(({id, template}) => {
      return {id, template}
    });

    return cells.map(({id, template}) => {
      return template
      ? template(elem[id])
      :`<div class="sortable-table__cell">${elem[id]}</div>`
    }).join('') 
  }

  getTable() {
    console.log()
    return `<div class="sortable-table">
    ${this.getHeaderTable()}
    ${this.getTableBody()}
    </div>`
  }

  render() {
    const div = document.createElement('div');
    div.innerHTML = this.getTable();
    const element = div.firstElementChild;
    this.element = element;
    this.subElements = this.getSubElements(element)
    
     
  }
 

  sort(field, order) {
    const sortedData = this.sortData(field, order);

    this.subElements.body.innerHTML = this.getTableRows(sortedData)
    
  }

  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headerConfig.find(item => item.id === field);
    const {sortType} = column;
    const directions = {
      asc: 1,
      desc: -1
    }
    const direction = directions[order]

    
    return arr.sort((a,b) => {
     switch (sortType) {
       case 'number':
         return direction * (a[field] - b[field]);
       case 'string':
         return direction * a[field].localeCompare(b[field], ['ru', 'en'])
      default:
        return direction * (a[field] - b[field]);
     }
    })
  }


  getSubElements() {
    const result = this.subElements;
    const elements = this.element.querySelectorAll("[data-element]");
    
    for (const subElement of elements) {
        const name = subElement.dataset.element;
        result[name] = subElement;
        
    }
    
    return result;
}

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
  destroy() {
    this.remove;
    this.element = null;
    this.subElements = {};

  }

}
     

