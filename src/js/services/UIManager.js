const $ = require("jquery");

export default class UIManager {

    constructor(selector) {
        //clases de CSS que únicamente definen estados de componente
        this.uiStateClasses = "empty loading error partial ideal";
        //seleccionamos el elemento de jquery en el constructor
        this.element = $(selector);
    }

    setEmpty() {
        $(this.element).removeClass(this.uiStateClasses).addClass("empty");
    }

    setFieldEmpty(field, fieldParent = false) {
        $(field).removeClass(this.uiStateClasses).addClass("empty");
        if(fieldParent){
            fieldParent.removeClass(this.uiStateClasses).addClass("empty");
        }
    }

    setLoading() {
        $(this.element).removeClass(this.uiStateClasses).addClass("loading");
    }

    setError() {
        $(this.element).removeClass(this.uiStateClasses).addClass("error");
    }

    setFieldError(field, fieldParent = false) {
        $(field).removeClass(this.uiStateClasses).addClass("error");
        if(fieldParent){
            fieldParent.removeClass(this.uiStateClasses).addClass("error");
        }  
    }

    setPartial() {
        $(this.element).removeClass(this.uiStateClasses).addClass("partial");
    }

    setIdeal() {
        $(this.element).removeClass(this.uiStateClasses).addClass("ideal");
    }

    setFieldIdeal(field, fieldParent = false) {
        $(field).removeClass(this.uiStateClasses).addClass("ideal");
        if(fieldParent){
            fieldParent.removeClass(this.uiStateClasses).addClass("ideal");
        }  
    }

    setFieldErrorHtml(field, errorMessage) {
        $(field).attr("placeholder", errorMessage);
    }

    setEmptyHtml(html) {
        this.element.find(".ui-status.empty").html(html);
    }

    setLoadingHtml(html) {
        this.element.find(".ui-status.loading").html(html);
    }

    setErrorHtml(html) {
        this.element.find(".ui-status.error").html(html);
    }

    setFieldErrorHtml(field, errorMessage) {
        $(field).attr("placeholder", errorMessage);
    }

    setPartialHtml(html) {
        this.element.find(".ui-status.partial").html(html);
    }

    setIdealHtml(html) {
        this.element.find(".ui-status.ideal").html(html);
    }
}