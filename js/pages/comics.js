
export default class Comics {
    constructor(context) {
        this._context = context;
        this._rootEl = context.rootEl();

    }

    init() {
        this._rootEl.innerHTML = `
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <form data-id="character-create">
                                <input type="hidden" data-id="id" value="0">
                                <div class="form-group">
                                    <label for="content-input">Content</label>
                                    <input type="text" data-id="content-input" class="form-control" id="content-input">
                                </div>
                                <div class="form-group">
                                    <div class="custom-file">
                                        <input type="hidden" data-id="media-name-input">
                                        <input type="file" data-id="media-input" class="custom-file-input" id="media-input">
                                        <label class="custom-file-label" for="media-input">Choose file</label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>                             
                        </div>
                    </div>             
                </div>
            </div>
        `;
    }

    destroy() {

    }
}