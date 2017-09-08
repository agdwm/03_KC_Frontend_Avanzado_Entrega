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
    setLoading() {
        $(this.element).removeClass(this.uiStateClasses).addClass("loading");
    }

    setError() {
        $(this.element).removeClass(this.uiStateClasses).addClass("error");
    }

    setFieldError(field) {
        $(field).removeClass(this.uiStateClasses).addClass("error");
    }

    setPartial() {
        $(this.element).removeClass(this.uiStateClasses).addClass("partial");
    }

    setIdeal() {
        $(this.element).removeClass(this.uiStateClasses).addClass("ideal");
    }

    setFieldIdeal(field) {
        $(field).removeClass(this.uiStateClasses).addClass("ideal");
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