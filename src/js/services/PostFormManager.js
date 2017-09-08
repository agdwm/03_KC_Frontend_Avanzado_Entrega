const $ = require("jquery");

import UIManager from './UIManager';

export default class PostFormManager extends UIManager {

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
        //this.element == form
        const fields = this.element.find('input, textarea');
        
        for (let field of fields) {
            
            if (field.checkValidity() == false) {
                //con "validationMessage" usamos la propia validación de HTML5
                console.log($(field).val());
                let errorMessage = field.validationMessage;
                field.focus();
                this.setFieldError(field);
                this.setFieldErrorHtml(field, errorMessage);
                this.setError();
                this.setErrorHtml(errorMessage);
                return false;
            }else{
                this.setFieldIdeal(field);
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
        this.postsService.save(post, success => {
            this.pubSub.publish("new-post", post); // publicamos el evento que informa de la creación de una canción 
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setErrorHtml("Se ha producido un error enviar los datos.");
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