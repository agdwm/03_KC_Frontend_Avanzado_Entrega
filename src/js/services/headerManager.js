const $ = require("jquery");

export default class HeaderManager {
    
    constructor() {
        this.navIcon = $("#js_nav-icon");
        this.mainNavigation = $("#js_nav-navigation");
        this.navSearchBtn = $("#js_search-btn");
        this.pushableContent = $("#js_pushable-content");
        this.navWrap = $("#js_nav-wrap");
        this.mainContainer = $("#js_main-container");
        this.deviceWidth = 992;
    }

    init() {

        let self = this;
        let doit;

        $(window).on("resize", function(e) {
            clearTimeout(doit);

            doit = setTimeout(function(e) {
                self.resize();
            }, 250);
        });

        this.checkWidth();
        
        this.navSearchBtn.on("click", function (e) {
            let $this = $(this);
            self.toggleSearcher($this);
            return false;
        });
    }

    resize(){
        this.checkWidth();
    }

    checkWidth(){
        
        let windowSize = $(window).outerWidth();
        let self = this;

        if (windowSize >= this.deviceWidth) {
            this.removeMovileClass();
            return false;
        }else {
            //El icono solo se activa en movil. Ok
            this.navIcon.on("click", function (e) {
                e.stopImmediatePropagation();
                let $this = $(this);
                self.toggleNavIcon($this);
                self.translateMenu();
                return false;
            });
        }
    }
    
    //Eliminar clases para movil en navegacion y contenedor desplazado
    removeMovileClass() {

        if (this.mainNavigation.hasClass("open-mobile")) {
            this.mainNavigation.removeClass("open-mobile");
        }
        if (this.pushableContent.hasClass("move-mobile")) {
            this.pushableContent.removeClass("move-mobile");
        }
        if (this.navIcon.hasClass("open")) {
            this.navIcon.removeClass("open");
        }
        if (this.navWrap.hasClass("move-mobile")) {
            this.navWrap.removeClass("move-mobile");
        }
    }

    //Toggle Hamburger Icon. Solo aparece < 992
    toggleNavIcon($this) {
        $this.toggleClass('open');
        return false;
    }

    //
    translateMenu() {
        this.mainNavigation.toggleClass("open-mobile");
        this.pushableContent.toggleClass("move-mobile");
        this.navWrap.toggleClass("move-mobile");
        return false;
    }

    //Toggle Input Buscador. Aparece en todas las resoluciones
    toggleSearcher(ancla){
        let inputSearch = $("#js_search-input");
        
        inputSearch.fadeToggle("fast");
        ancla.toggleClass("search-active");
        console.log("search");
    }
}