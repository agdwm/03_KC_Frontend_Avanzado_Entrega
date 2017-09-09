const $ = require("jquery");

import UIManager from './UIManager';

export default class PostFormManager extends UIManager {

    constructor(formSelector, postsService, pubSub) {
        super(formSelector);
        this.postsService = postsService;
        this.pubSub = pubSub;
        this.textarea = $("#message");
        this.boxOfLimit = this.element.find("#limit-words"); //this.element = form
        this.boxLimitInitialText = this.boxOfLimit.text();
        this.fields = this.element.find('input, textarea');
        this.namesAndPlaceholders = {};
    }

    init() {
        this.setupSubmitEventHandler();
        let self = this;

        this.textarea.on("keyup", function(e){
            let $this = $(this);
            self.limitWords($this);
            return false;
        });
        this.savePlaceholders();
    }

    savePlaceholders(){
        let listNames = [];
        let listPlaceholders = [];
        //const namesAndPlaceholders = {};
        let i;

        for (i = 0; i < this.fields.length; i++) {
            let field = this.fields[i];

            const inputName = $(field).attr("name");
            const inputPlaceholder = $(field).attr("placeholder");

            listNames.push(inputName);
            listPlaceholders.push(inputPlaceholder);

            this.namesAndPlaceholders[listNames[i]] = listPlaceholders[i];    
        }
        console.log(this.namesAndPlaceholders);
    }

    limitWords($this) {
        let numberOfWords = this.textarea.val().trim().replace(/\s\s+/g, ' ');
        let lengthOfWords = numberOfWords.split(' ').length;
        let boxOfLimit = this.element.find("#limit-words");
        
        
        if($this.val() === ""){
            console.log(boxOfLimit.text(this.boxLimitInitialText));
            this.setFieldEmpty(boxOfLimit);
        }else{
            boxOfLimit.text(`Palabras: ${lengthOfWords}`);
            if(lengthOfWords > 120){
                this.setFieldError(boxOfLimit);
            }else{
                this.setFieldIdeal(boxOfLimit);
            }
        }
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

        for (let field of this.fields) {
            //Si es inválido
            if (field.checkValidity() == false) {
                //Si está vacío
                const placeholder = $(field).attr("placeholder");
                let errorMessage = "";

                if (!$(field).val()) {
                    errorMessage = "Este campo es obligatorio";
                    $(field).attr("placeholder", errorMessage);
                   /* field.focus();
                    this.setFieldError(field);
                    this.setError();
                    return false;*/
                }else{
                    $(field).val(""),
                    errorMessage = $(field).data("error");
                    $(field).attr("placeholder", errorMessage);
                }
                //Si no está vacío
                
                field.focus();
                this.setFieldError(field);
                this.setFieldErrorHtml(field, errorMessage);
                this.setError();
                this.setErrorHtml(errorMessage);
                return false;
            //Si es válido
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