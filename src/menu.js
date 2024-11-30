import { Menu } from './core/menu'
import { CustomMessage } from './modules/customMessage.module';
import { BackgroundModule } from './modules/background.module';

export class ContextMenu extends Menu {
    constructor(selector) {
        super(selector);
        this.menu = this.el;
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    open() {
        document.addEventListener('contextmenu', this.handleContextMenu);
        document.addEventListener('click', this.handleDocumentClick);
        document.addEventListener('click', this.handleItemClick);
    }

    close() {
        this.menu.classList.remove('open');
    }

    add() {
        const customMessage = new CustomMessage().toHTML();
        const backgroundModule = new BackgroundModule().toHTML();

        this.menu.innerHTML = `
            ${customMessage} 
            ${backgroundModule}
        `
    }

    handleContextMenu(e) {
        e.preventDefault();
        const xCoord = e.pageX;
        const yCoord = e.pageY;
        this.menu.classList.add('open');
        this.menu.style.position = 'absolute';
        this.menu.style.top = `${yCoord}px`;
        this.menu.style.left = `${xCoord}px`;
    }

    handleDocumentClick(e) {
        if (!this.menu.contains(e.target)) {
            this.close();
        }
    }

    handleItemClick(e) {
        if (e.target.classList.value === 'menu-item') {
            const showCustomMessage = new CustomMessage();
            showCustomMessage.trigger();
            // console.log(e.target.getAttribute('data-type'))
            if (e.target.getAttribute('data-type') == 1) {
                const showCustomMessage = new CustomMessage();
                showCustomMessage.trigger();
            } else if (e.target.getAttribute('data-type') == 2) {
                const showBackgroundModule = new BackgroundModule();
                showBackgroundModule.trigger();
            }
        }
    }
}
