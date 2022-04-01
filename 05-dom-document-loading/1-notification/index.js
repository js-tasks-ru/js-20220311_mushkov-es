export default class NotificationMessage {
  static activeNode;
    constructor(text = '', {
        duration = 2000,
        type = 'success'
    } = {}) {
        this.duration = duration;
        this.type = type;
        this.text = text;
        this.render(); 
          
        
    }

    get template() {
      return `<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.text}
        </div>
      </div>
    </div>`
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = this.template;
      this.element = element.firstElementChild;
     
    }

    show(targetNode = document.body) {
      
      if (NotificationMessage.activeNode) {
        NotificationMessage.activeNode.remove();
      }
      
      targetNode.append(this.element);

      setTimeout(() => {
        this.remove()// Разница между удалением this и this.element
      },this.duration)
 
      NotificationMessage.activeNode = this
    }
    

    remove() {
      if (this.element) {
        this.element.remove();
      }
    }
    
    destroy() {
      this.remove();
      this.element = null;
      NotificationMessage.activeNode = null;
    }
}
