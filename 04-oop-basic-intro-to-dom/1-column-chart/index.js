export default class ColumnChart {
    constructor(data) {
        this.data = data.data;
        this.label = data.label;
        this.value = data.value;
        this.link = data.link;
        this.formatHeading = data.formatHeading || ((value) => value);

        this.render()
    }

    getTimplate() {
        let column = '';
        for (const value of this.data) {
            column += ` <div style="--value: ${value}" data-tooltip="${(value / 50 * 100).toFixed(0)}%"></div>`

        }
        return column;
    }

    render() {
        
        if (this.data.length !== 0) {
            const linkHtml = this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : '';

            const totalSales = this.data.reduce((accum, currentValue) => {
                return accum + currentValue;
            })
            this.element = document.createElement('div')
            this.element.innerHTML = `<div class="column-chart" style="--chart-height: 50">
            <div class="column-chart__title">
              Total ${this.label}
              ${linkHtml}
            </div>
            <div class="column-chart__container">
              <div data-element="header" class="column-chart__header">${this.formatHeading(totalSales)}</div>
              <div data-element="body" class="column-chart__chart">
                ${this.getTimplate()}
              </div>
            </div>
          </div>
        </div>`
            this.element = this.element.firstElementChild

        }
        else {
            
            this.element = document.createElement('div')
            this.element.innerHTML = `<div id="orders" class="dashboard__chart_orders">
            <div class="column-chart column-chart_loading" style="--chart-height: 50">
              <div class="column-chart__title">
                Total orders
                <a class="column-chart__link" href="#">View all</a>
              </div>
              <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">
                  344
                </div>
                <div data-element="body" class="column-chart__chart">
                    <img src="./charts-skeleton.svg">
                </div>
              </div>
            </div>
          </div>`
            this.element = this.element.firstElementChild

        }
    }

    update(data) {
        this.data = data
        this.render()
    }

    remove() {
        if (this.element) {
            this.element.remove();
    }
    }

    destroy() {
        this.remove();
        this.element = null;
    }
}
