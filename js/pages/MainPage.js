
export default class MainPage {
    constructor(context) {
        this._context = context;
        this._rootEl = context.rootEl();

    }

    init() {
        this._rootEl.innerHTML = `
            Hello world
        `;
    }

    destroy() {

    }
}