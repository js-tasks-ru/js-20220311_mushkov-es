export default class SortableTable {

  element;
  subElements = {};
  direction
  flag = true;
  
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;
    this.render();
    this.sort();

  }

  getTableHead() {
    return ` <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.getHeadRow()}
            </div>`
  }

  getHeadRow() {
    return this.headersConfig.map(elem => {
    return  `<div class="sortable-table__cell" data-id="${elem.id}" data-sortable="${elem.sortable}" data-order="${this.sorted.order}">
      <span>${elem.title}</span>
    </div>`
    }).join('');
  }


  getTableBody() {// Почему нельзя this.data передать в параметр
    return ` <div data-element="body" class="sortable-table__body">
    ${this.getTableRows(this.data)}</div>`
  }


  getTableRows(data) {
    return data.map(elem => {
      return `<a href="/products/${elem.id}" class="sortable-table__row">
      ${this.getRowsData(elem)}
      </a>`
    }).join('')
  }

  getRowsData(elem){
    const dataCells = this.headersConfig.map(({id, template}) => {
    return {id, template}
    })
  
    return dataCells.map(({id, template}) => {// Почему не работает, если сразу вызвать map на headerConfig
      return template
      ? template(elem[id])
      : ` <div class="sortable-table__cell">${elem[id]}</div>`
    }).join('')
  }


  getTable() {
    return `<div class="sortable-table">
    ${this.getTableHead()}
    ${this.getTableBody()}
    </div>`
  }

  render() {
    const container = document.createElement('div');
    container.innerHTML = this.getTable();
    this.element = container.firstElementChild;
    this.subElements = this.getSubElements()
  }


  sort() {
    const header = this.element.querySelector('[data-element="header"]');
    header.addEventListener('pointerdown', this.onClick);

  }
  
  onClick = (event) => {

    if (event.target.tagName === 'SPAN') {

      const name = event.target.innerText;
      let sortedData = this.sortData(this.headersConfig.find(item => item.title === name).id, this.sorted.order)
      this.subElements.body.innerHTML = this.getTableRows(sortedData)
      
    }
    
  }

  sortData = (field, order) => {
    
    const arr = [...this.data];
    const column = this.headersConfig.find(item => item.id == field);
    
    const {sortType} = column;
    const directions = {
      asc: 1,
      desc: -1
    }
    
    if (directions[order] === 1) {
      if (this.flag) {
         this.direction = directions[order]
        this.flag = false;
      }
      else{ 
       this.direction = directions[order] * -1;
        this.flag = true;}
    }
    else if(directions[order] === -1) {
      if (this.flag) {
        this.direction = directions[order]
       this.flag = false;
     }
     else{ 
      this.direction = directions[order] * -1;
       this.flag = true;}
    }
   

    

    
    return arr.sort((a,b) => {
     switch (sortType) {
       case 'number':
         return this.direction * (a[field] - b[field]);
       case 'string':
         return this.direction * a[field].localeCompare(b[field], ['ru', 'en'])
      default:
        return this.direction * (a[field] - b[field]);
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
