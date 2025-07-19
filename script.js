const config = {
    mobileBreakpoint: 600,
    selectors: {
        nav: "[data-js-nav]",
        navBg: "[data-js-nav-bg]",
        toggle: "[data-js-toggle]",
        toggleIcon: "[data-js-toggle-icon]",
        toggleText: "[data-js-toggle-text]"
    },
    classNames: {
        open: "open",
        buttonClose: "buttonClose",
        close: "close",
        visible: "visible"
    },
    text: {
        open: 'Close',
        closed: 'Menu'
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const elements = Object.fromEntries(Object.entries(config.selectors).map(([key, selector]) => [
        key,
        document.querySelector(selector)
    ]))
    const navLinks = elements.nav?.querySelectorAll("a") ?? [];

    if (!elements.nav || !elements.toggle) return;

    const menuState = {
        get isOpen() {
            return elements.nav.classList.contains(config.classNames.open);
        },
        set(isOpen) {
            const action = isOpen ? 'add' : 'remove';

            elements.nav.classList[action](config.classNames.open);
            elements.toggle.classList[action](config.classNames.buttonClose);
            elements.toggleIcon?.classList[action](config.classNames.close);
            elements.navBg?.classList[action](config.classNames.visible);

            if (elements.toggleText) {
                elements.toggleText.textContent = isOpen ?
                    config.text.open : config.text.closed;
            }
        },
        toggle() {
            this.set(!this.isOpen);
        },
        close() {
            this.set(false);
        }
    }

    const isMobile = () => window.innerWidth <= config.mobileBreakpoint;

    elements.toggle.addEventListener("click", () => menuState.toggle())
    elements.navBg.addEventListener("click", () => menuState.close());

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (isMobile()) menuState.close();
        });
    });
});