
export default class Main {
    constructor(context) {
        this._context = context;
        this._rootEl = context.rootEl();

    }

    init() {
        this._rootEl.innerHTML = `
            <div class="row">
                <div class="col-6">
                    <a class="btn btn-primary btn-lg btn-block" data-id="characters" href="/characters">Characters</a>                                        
                </div>
                <div class="col-6">
                    <a class="btn btn-primary btn-lg btn-block" data-id="comics" href="/comics">Comics</a>
                </div>
            </div>
        `;
        this._rootEl.querySelector('[data-id=characters]').addEventListener('click', evt => {
            evt.preventDefault();
            this._context.route(evt.currentTarget.getAttribute('href'));
        });
        this._rootEl.querySelector('[data-id=comics]').addEventListener('click', evt => {
            evt.preventDefault();
            this._context.route(evt.currentTarget.getAttribute('href'));
        });
    }

    destroy() {

    }
}