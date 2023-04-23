class ClockComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const days = this.getAttribute('days');
        const hours = this.getAttribute('hours');
        const minutes = this.getAttribute('minutes');
        const seconds = this.getAttribute('seconds');
        
        //big container
        const container = document.createElement('div');
        container.className = 'timer';

        //day container
        const dayContainer = document.createElement('div');
        dayContainer.className = 'days';
        
        const dayTitle = document.createElement('h2');
        dayTitle.innerText = '6';
        const daySpan = document.createElement('span');
        daySpan.innerText = 'өдөр'

        //appending titles and span
        dayContainer.appendChild(dayTitle);
        dayContainer.appendChild(daySpan);

        //appending to big containers
        container.appendChild(dayContainer);
        this.appendChild(dayContainer);
    }
}

customElements.define('clock-component', ClockComponent);