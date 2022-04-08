class Tooltip {
  
  constructor() {
    if (Tooltip.instance) return Tooltip.instance;
    this.element;
    return Tooltip.instance = this;
}
  

  onMouseOver = (event) => {
    this.target = event.target.closest('[data-tooltip]');
    console.log(this.target)
    if (this.target) {
      const text = this.target.dataset.tooltip;
      this.render(text);
      this.target.addEventListener('pointermove', this.moveAt);
      this.target.addEventListener('pointerout', this.onMouseOut);
      
    }
  }

  onMouseOut = () => {
    this.target.removeEventListener('pointermove', this.moveAt);
    this.currentTooltip.remove()
  }

  initialize() {
    document.addEventListener('pointerover', this.onMouseOver)
  }

  render(dataAtrrName) {
    const div = document.createElement('div');
    div.innerHTML = `<div class="tooltip">${dataAtrrName}</div>`;
    this.element = div.firstElementChild;
    this.currentTooltip = this.element;
    document.body.append(this.currentTooltip)
  }

  moveAt = (event) => {
    this.currentTooltip.style.position = 'absolute';
    this.currentTooltip.style.left = event.clientX + 10 + 'px';;
    this.currentTooltip.style.top = event.clientY + 10 + 'px';;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

export default Tooltip;

