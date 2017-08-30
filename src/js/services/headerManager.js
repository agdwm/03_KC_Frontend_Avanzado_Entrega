const $ = require("jquery");

export default class HeaderManager {
    
    constructor(navIcon, mainNavigation, navSearchBtn) {
        //seleccionamos el elemento de jquery en el constructor
        this.navIcon = $(navIcon);
        this.mainNavigation = $(mainNavigation);
        this.navSearchBtn = $(navSearchBtn);
    }

    init() {
        let self = this;

        this.navIcon.on("click", function () {
            let anchor = $(this);
            self.toggleNavIcon(anchor);
            self.translateMenu();
        });

        this.navSearchBtn.on("click", function () {
            let ancla = $(this);
            self.toggleSearcher(ancla);
        });
    }

    toggleNavIcon(anchor) {
        anchor.toggleClass('open');
    }

    translateMenu() {
        this.mainNavigation.toggleClass("open-mobile");
        $("body").toggleClass("move-mobile");
    }
    toggleSearcher(ancla){
        
        $("#js_search-input").fadeToggle("fast");
    }


}