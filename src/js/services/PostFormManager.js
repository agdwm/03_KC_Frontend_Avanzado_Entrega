"use strict";

const $ = require("jquery");

import UIManager from './UIManager';

export default class PostFormManager extends UIManager {

    constructor(formSelector, commentsService, pubSub) {
        super(formSelector);
        this.postsService = commentsService;
        this.pubSub = pubSub;
        this.textarea = jQuery(".com-form_textarea");
        this.textareaWrapper = this.textarea.parent(".textarea_wrapper");
        this.input = jQuery(".com-form_input"); //ok
        this.inputWrapper = this.input.parent(".input_wrapper");
        this.boxOfLimit = this.element.find("#limit-words"); //this.element = form
        this.boxLimitInitialText = this.boxOfLimit.text(); //ok
        this.fields = this.element.find('input, textarea'); //ok
        this.formData = {};
    }

    init() {
        this.setupSubmitEventHandler();
        this.setupKeyUpEventHandler();
        this.setupChangeEventHandler();
    }

    setupSubmitEventHandler() {
        //element (from UIManager)
        this.element.on("submit", () => {
            this.validateAndSendData();
            return false;
        });
    }

    setupKeyUpEventHandler() {
        this.textarea.on("keyup", (e) => {
            this.limitWords(jQuery(e.currentTarget));
            return false;
        });
    }

    setupChangeEventHandler() {
        this.element.find(this.input, this.textarea).on("change", () => {
            this.isValid();
            return false;
        });
    }

    //Funcinoes de Estilo del elemento BoxOfLimit
    boxOfLimitEmpty(){
        this.setFieldEmpty(this.boxOfLimit);
    }
    boxOfLimitError(){
        this.setFieldError(this.boxOfLimit);
    }
    boxOfLimitIdeal(){
        this.setFieldIdeal(this.boxOfLimit);
    }

    limitWords($this){
        let textareaWrapper = this.textarea.parent(".textarea_wrapper");
        let numberOfWords = this.textarea.val().trim().replace(/\s\s+/g, ' ').split(' ').length;

        if($this.val() === ""){
            this.boxOfLimit.text(this.boxLimitInitialText);
            this.boxOfLimitEmpty();
            this.setFieldEmpty($this, this.textareaWrapper);
        }else{
            this.boxOfLimit.text(`Total de palabras: ${numberOfWords}`);
            if(numberOfWords > 120 && numberOfWords !== undefined){
                this.boxOfLimitError();
                this.setFieldError($this, this.textareaWrapper);
                this.setError(); //Seteamos el elemento form a Error
                this.switchButtonSubmit(false);
                return false;
            }else{
                this.boxOfLimitIdeal();
                this.setFieldIdeal($this, this.textareaWrapper);
                this.switchButtonSubmit(true);
            }
        }
    }

    switchButtonSubmit(value){
        if (value === false){
            this.element.find("#submit").prop('disabled', true);
        }else if(value === true){
            this.element.find("#submit").prop('disabled', false);
        }
    }

    validateAndSendData(){
        if (this.isValid()) {
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
                this.setError(); //Seteamos el elemento form a Error

                //está vacío
                if (!$(field).val()) {

                    if (event.type === "submit"){
                        let dataName = $(field).data("name");
                        let errorMessage = "";

                        errorMessage = `El campo "${dataName}" es obligatorio`;
                        $(field).attr("placeholder", errorMessage);

                        if(inputWrapper.length){
                            this.setFieldError(field, inputWrapper);
                            field.focus();
                            return false;
                        }
                        if(textareaWrapper.length){
                            this.setFieldError(field, textareaWrapper);
                            field.focus();
                            return false;
                        }
                    }else{
                        if(inputWrapper.length){
                            this.setFieldEmpty(field, inputWrapper);
                        }
                        if(textareaWrapper.length){
                            this.setFieldEmpty(field, textareaWrapper);
                        }
                    }
                //está relleno
                }else{
                    if(inputWrapper.length){
                        this.setFieldError(field, inputWrapper);
                        return false;
                    }
                    if(textareaWrapper.length){
                        this.setFieldError(field, textareaWrapper);
                        return false;
                    }
                }
            //Si es válido
            }else{
                if(inputWrapper.length){
                    this.setFieldIdeal(field, inputWrapper);
                }
                if(textareaWrapper.length){
                    const numeroPalabras = this.textarea.val().trim().replace(/\s\s+/g, ' ').split(' ').length;

                    if(numeroPalabras > 120 && numeroPalabras !== undefined){
                        this.setFieldError(field, textareaWrapper);
                        this.setError(); //Seteamos el elemento form a Error
                        this.switchButtonSubmit(false);
                        return false;
                    }else{
                        this.setFieldIdeal(field, textareaWrapper);
                        this.switchButtonSubmit(true);
                        return true;
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
            const inputValue = $(field).val();
            const inputValueEncoded = inputValue.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

            listNames.push(inputName);
            listValues.push(inputValueEncoded);

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
            this.resetFormStyles();
            this.switchButtonSubmit(true);
        }, error => {
            this.setErrorHtml("Se ha producido un error enviar los datos.");
            this.setError();
        });
    }

    resetForm() {
        this.element[0].reset(); // resetea el formulario
    }

    resetFormStyles(){
        for (let field of this.fields){
            this.setFieldEmpty(field, this.inputWrapper);
            this.setFieldEmpty(field, this.textareaWrapper);
        }
        this.boxOfLimitEmpty();
        this.setEmpty();
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

    setEmpty(){
        super.setEmpty();
        this.enableFormControls();        
    }
}