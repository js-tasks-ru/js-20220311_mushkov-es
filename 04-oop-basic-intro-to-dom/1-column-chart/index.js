export default class ColumnChart {
    changeableElements = {};
    chartHeight = 50;

    constructor({
      data = [],
      label = '',
      link = '',
      value = 0,
      formatHeading = data => data
    } = {}) {
        this.data = data;
        this.label = label;
        this.value = value;
        this.link = link;
        this.value = formatHeading(value);

        this.render()
    }

   get template() {
       return `<div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
       <div class="column-chart__title">
         Total ${this.label}
         ${this.checkLink()}
       </div>
       <div class="column-chart__container">
         <div data-element="header" class="column-chart__header">
           ${this.value}
         </div>
         <div data-element="body" class="column-chart__chart">
         ${this.getColumnBody()}
         </div>
       </div>
     </div>`
   }

   getColumnBody(){
       const scale = this.chartHeight / Math.max(...this.data);
       return this.data.map(elem => {
           return `<div style="--value: ${Math.floor(elem * scale)}
           " data-tooltip="${(elem * scale / this.chartHeight * 100).toFixed(0)}%"></div>`
       }).join('')
        
    }
   render() {
       const container = document.createElement('div');
       container.innerHTML = this.template;
       this.element = container.firstElementChild;
       if (this.data.length) {
           this.element.classList.remove("column-chart_loading")
       }

       this.changeableElements = this.getChangeableElements();
    }

    getChangeableElements() {
        const result = this.changeableElements;
        const elements = this.element.querySelectorAll("[data-element]");
        for (const subElement of elements) {
            const name = subElement.dataset.element;
            result[name] = subElement;
        }
        return result;
    }

    checkLink() {
      return  this.link
      ? `<a class="column-chart__link" href="${this.link}">View all</a>`
      :''; 
    }
    update(data) {
        this.data = data;
        this.changeableElements.body.innerHTML = this.getColumnBody(data);
    }

    remove() {
        if (this.element) {
          this.element.remove();
        }
      }
    
      destroy() {
        this.remove();
        this.element = null;
        this.changeableElements = {};
      }

   
    
}
