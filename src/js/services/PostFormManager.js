const $ = require("jquery");

import UIManager from './UIManager';

export default class SongFormManager extends UIManager {

    constructor(formSelector, postsService, pubSub) {
        super(formSelector);
        this.postsService = postsService;
        this.pubSub = pubSub;
    }

    init() {
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {
        //element (from UIManager)
        this.element.on("submit", () => {
            this.validateAndSendData();
            // en jQuery podemos hacer un preventDefault haciendo un return false en los manejadores de evento
            return false; // == event.preventDefault();
        });
    }

    validateAndSendData() {
        if (this.isValid()) {
            this.send();
        }
    }

    isValid() {
        const fields = this.element.find('input, textarea');
        for (let input of fields) {
            if (field.checkValidity() == false) {
                const errorMessage = field.validationMessage;
                field.focus();
                this.setErrorHtml(errorMessage);
                this.setError();
                return false;
            }
        }
        // Llegamos aquí, si no hay ningún error
        this.setIdeal(); 
        return true;
    }

    send() {
        this.setLoading();
        const post = {
            name: this.element.find('#nombre').val(),
            surname: this.element.find('#apellidos').val(),
            email: this.element.find('#email').val(),
            message: this.element.find('#message').val()

        };
        this.songsService.save(song, success => {
            this.pubSub.publish("new-song", song); // publicamos el evento que informa de la creación de una canción 
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setErrorHtml("Se ha producido un error al guardar la canción en el servidor.");
            this.setError();
        });
    }

    /*resetForm() {
        this.element[0].reset(); // resetea el formulario
    }*/

    disableFormControls() {
        this.element.find("input, textarea, button").attr("disabled", true);
    }

    enableFormControls() {
        this.element.find("input, textarea, button").attr("disabled", false);
    }

    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

    setError() {
        super.setError();
        this.enableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }
}