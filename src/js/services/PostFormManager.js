"use strict";

const $ = require("jquery");

import UIManager from './UIManager';

export default class PostFormManager extends UIManager {

    constructor(formSelector, commentsService, pubSub) {
        super(formSelector);
        this.postsService = commentsService;
        this.pubSub = pubSub;
        this.textarea = jQuery(".com-form_textarea");
        this.input = jQuery(".com-form_input");
        this.boxOfLimit = this.element.find("#limit-words"); //this.element = form
        this.boxLimitInitialText = this.boxOfLimit.text();
        this.fields = this.element.find('input, textarea');
        this.formData = {};
    }

    init() {
        let self = this;

        this.setupSubmitEventHandler(self);
        this.changeEventHandler();

        this.textarea.on("keyup", function(e){
            let $this = $(this);
            self.limitWords($this);
            return false;
        });
    }

    resetBoxOfLimit(){
        this.boxOfLimit.text(this.boxLimitInitialText);
        this.setFieldEmpty(this.boxOfLimit);
    }

    limitWords($this) {
        let textareaWrapper = this.textarea.parent(".textarea_wrapper");
        let numberOfWords = this.textarea.val().trim().replace(/\s\s+/g, ' ').split(' ').length;

        if($this.val() === ""){
            this.resetBoxOfLimit();
        }else{
            this.boxOfLimit.text(`Total de palabras: ${numberOfWords}`);
            if(numberOfWords > 120 && numberOfWords !== undefined){
                this.setFieldError(this.boxOfLimit); //ok
                this.setError(); //ui-status error
                this.setFieldError($this, textareaWrapper); //com-form_textarea y textarea-wrapper error (recuadro)
                this.switchSubmit(false);
                return false;
            }else{
                this.setFieldIdeal(this.boxOfLimit); //ok
                this.setFieldIdeal($this, textareaWrapper); //com-form_textarea empty (recuadro)
                this.setIdeal(); //ui-status empty
            }
        }
    }

    changeEventHandler(){
        let self = this;
        this.element.find(this.input, this.textarea).bind("change", function(){
            self.isValid();
        });
    }

    setupSubmitEventHandler( ) {
        //element (from UIManager)
        this.element.on("submit", () => {
            this.validateAndSendData();
            // en jQuery podemos hacer un preventDefault haciendo un return false en los manejadores de evento
            return false; // == event.preventDefault();
        });
    }

    switchSubmit(value){
        if (value === false){
            this.element.find("#submit").prop('disabled', true);
        }else if(value === true){
            this.element.find("#submit").prop('disabled', false);
        }
    }

    validateAndSendData(){
        if (this.isValid()) {
            console.log("hola");
            this.getFormData();
            this.send();
        }
    }

    isValid() {
        for (let field of this.fields) {
            const inputWrapper = $(field).parent(".input_wrapper");
            const textareaWrapper = $(field).parent(".textarea_wrapper");
            const eventType = event.type;
             
            //Si el campo es inválido
            if (field.checkValidity() === false) {

                const placeholder = $(field).attr("placeholder");

                //está vacío
                if (!$(field).val()) {

                    if (event.type === "submit"){
                        let dataName = $(field).data("name");
                        let errorMessage = "";

                        errorMessage = `El campo "${dataName}" es obligatorio`;
                        $(field).attr("placeholder", errorMessage);

                        if(inputWrapper.length){
                            this.setFieldError(field, inputWrapper);
                            this.setError();
                            field.focus();
                        }
                        if(textareaWrapper.length){
                            this.setFieldError(field, textareaWrapper);
                            this.setError();
                            field.focus();
                        }
                        return false;
                    }else{
                        if(inputWrapper.length){
                            this.setFieldEmpty(field, inputWrapper);
                            this.setEmpty();
                        }
                        if(textareaWrapper.length){
                            this.setFieldEmpty(field, textareaWrapper);
                            this.setEmpty();
                        }
                    }
                //está relleno
                }else{
                    if(inputWrapper.length){
                        this.setFieldError(field, inputWrapper);
                        this.setError();
                        //return false;
                    }
                    if(textareaWrapper.length){
                        this.setFieldError(field, textareaWrapper);
                        this.setError();
                        //return false;
                    }
                }
                return false;

            //Si es válido
            }else{

                if(inputWrapper.length){
                    this.setFieldIdeal(field, inputWrapper);
                    this.setIdeal();
                }
                if(textareaWrapper.length){
                    const numeroPalabras = this.textarea.val().trim().replace(/\s\s+/g, ' ').split(' ').length;

                    if(numeroPalabras > 120 && numeroPalabras !== undefined){
                        this.setFieldError(field, textareaWrapper);
                        this.setError();
                        return false; //false ok
                    }else{
                        this.setFieldIdeal(field, textareaWrapper);
                        this.setIdeal();
                        return true; //true ok
                    }
                }
            }
        }
    }

    getFormData() {
        let listNames = [];
        let listValues = [];
        let i;

        for (i = 0; i < this.fields.length; i++) {
            let field = this.fields[i];

            const inputName = $(field).attr("name");
            const inputValue = encodeURI($(field).val());

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
            this.resetBoxOfLimit();
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