export default class Characters {
    constructor(context) {
        this._context = context;
        this._rootEl = context.rootEl();

    }

    init() {
        this._rootEl.innerHTML = `
            <div class="row">
                <a class="btn btn-primary btn-lg btn-block" data-id="menu" href="/">Back to main</a>  
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <form data-id="character-create">
                                <div class="form-group">
                                    <label for="name-input">Name</label>
                                    <input type="text" data-id="name-input" class="form-control" id="name-input">
                                    <label for="description-input">Description</label>
                                    <input type="text" data-id="description-input" class="form-control" id="description-input">
                                </div>
                                <div class="form-group">
                                    <div class="custom-file">
                                        <input type="hidden" data-id="image-name-input">
                                        <input type="file" data-id="image-input" class="custom-file-input" id="image-input">
                                        <label class="custom-file-label" for="image-input"><span data-id="change-label">Choose file</span></label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">Create</button>
                            </form>                             
                        </div>
                    </div>             
                </div>
            </div>
            <div class="modal fade" data-id="error-modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Error!</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div data-id="error-message" class="modal-body"></div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.characterCreationHandler();

        this._rootEl.querySelector('[data-id=menu]').addEventListener('click', evt => {
            evt.preventDefault();
            this._context.route(evt.currentTarget.getAttribute('href'));
        });

        this._errorModal = $('[data-id=error-modal]');
        this._errorMessageEl = this._rootEl.querySelector('[data-id=error-message]');




    }

    characterCreationHandler() {
        this._characterCreateFormEl = this._rootEl.querySelector('[data-id=character-create]');

        this._nameInputEl = this._characterCreateFormEl.querySelector('[data-id=name-input]');
        this._descriptionInputEl = this._characterCreateFormEl.querySelector('[data-id=description-input]');
        this._imageNameInpulEl = this._characterCreateFormEl.querySelector('[data-id=image-name-input]');
        this._imageInputEl = this._characterCreateFormEl.querySelector('[data-id=image-input]');
        this._changeLabel = this._characterCreateFormEl.querySelector('[data-id=change-label]');

        this._imageInputEl.addEventListener('change', evt => {
            const [file] = Array.from(evt.currentTarget.files);
            this._changeLabel.innerHTML = `${file.name}`;
            const formData = new FormData();
            formData.append('file', file);
            this._context.post('/file/upload', formData, {},
                text => {
                    const data = JSON.parse(text);
                    this._imageNameInpulEl.value = data.name;
                },
                error => {
                    this.showError(error);
                });
        });

        this._characterCreateFormEl.addEventListener('submit', evt => {
            evt.preventDefault();
            const data = {
                name: this._nameInputEl.value,
                description:this._descriptionInputEl.value,
                image: this._imageNameInpulEl.value || null
            };
            this._context.post('/editor/save/character', JSON.stringify(data), {'Content-Type': 'application/json'},
                text => {
                    this._nameInputEl.value = '';
                    this._descriptionInputEl.value = '';
                    this._imageNameInpulEl.value = '';
                    this._changeLabel.innerHTML = `Choose file`;
                    this.clean();
                },
                error => {
                    this.showError(error);
                });
        });
    }

    showError(error) {
        const data = JSON.parse(error);
        const message = this._context.translate(data.message);
        this._errorMessageEl.textContent = message;
        this._errorModal.modal('show');
    }

    destroy() {

    }
}