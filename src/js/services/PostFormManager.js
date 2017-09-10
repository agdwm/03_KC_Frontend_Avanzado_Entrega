const $ = require("jquery");

import UIManager from './UIManager';

export default class PostFormManager extends UIManager {

    constructor(formSelector, postsService, pubSub) {
        super(formSelector);
        this.postsService = postsService;
        this.pubSub = pubSub;
        this.textarea = $(".com-form_textarea");
        this.input = $(".com-form_input");
        this.boxOfLimit = this.element.find("#limit-words"); //this.element = form
        this.boxLimitInitialText = this.boxOfLimit.text();
        this.fields = this.element.find('input, textarea');
        this.formData = {};
    }

    init() {
        this.setupSubmitEventHandler();
        this.inputChangeEventHandler();
        let self = this;

        this.textarea.on("keyup", function(e){
            let $this = $(this);
            self.limitWords($this);
            return false;
        });
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

    inputChangeEventHandler() {
        let self = this;
        this.element.find(this.input, this.textarea).bind("change", function(){
            self.addIcon();
        })
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
            this.getFormData();
            this.send();
        }
    }

    addIcon() {
        for (let field of this.fields) {
           
            let inputWrapper = $(field).parent(".input_wrapper");
            let textareaWrapper = $(field).parent(".textarea_wrapper");
            
            //Es inválido
            if (field.checkValidity() == false) {
                //El campo está relleno
                if ($(field).val()) {
                    if (inputWrapper){
                        inputWrapper.removeClass(this.uiStateClasses).addClass("error");
                        this.setFieldError(field, inputWrapper);
                    }
                    if(textareaWrapper){
                        console.log("El campo está relleno y existe el textarea. Mostrar ERROR");
                        textareaWrapper.removeClass(this.uiStateClasses).addClass("error");
                        this.setFieldError(field, textareaWrapper);
                    }
                }
            //Es válido y tiene el formato correcto
            }else{
                if (inputWrapper){
                    inputWrapper.removeClass(this.uiStateClasses).addClass("ideal");
                    this.setFieldIdeal(field, inputWrapper);
                }
                if(textareaWrapper){
                    console.log("El campo está relleno y existe el textarea. Mostrar OK");
                    textareaWrapper.removeClass(this.uiStateClasses).addClass("ideal");
                    this.setFieldIdeal(field, textareaWrapper);
                }
            } 
        }
    }


    isValid() {

        for (let field of this.fields) {
            //let inputWrapper = $(field).parent(".input_wrapper");
            //let textareaWrapper = $(field).parent(".textarea_wrapper");
            //Si es inválido
            if (field.checkValidity() == false) {
                //Si está vacío
                const placeholder = $(field).attr("placeholder");
                let errorMessage = "";

                if (!$(field).val()) {
                    errorMessage = "Este campo es obligatorio";
                    $(field).attr("placeholder", errorMessage);
                }else{
                    $(field).val("");
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

    getFormData() {
        let listNames = [];
        let listValues = [];
        let i;

        for (i = 0; i < this.fields.length; i++) {
            let field = this.fields[i];

            const inputName = $(field).attr("name");
            const inputValue = $(field).val();

            listNames.push(inputName);
            listValues.push(inputValue);

            this.formData[listNames[i]] = listValues[i];
        }

        if(this.formData){
            return true;   
        }else{
            console.log("Se ha producido un error al procesar los datos");
            return false;
        }
        
    }

    send() {
        this.setLoading();

        this.postsService.save(this.formData, success => {
            this.pubSub.publish("new-comment", this.formData); // publicamos el evento que informa del envío de un comentario
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setErrorHtml("Se ha producido un error enviar los datos.");
            this.setError();
        });
    }

       
    resetForm() {
        this.element[0].reset(); // resetea el formulario
    }

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