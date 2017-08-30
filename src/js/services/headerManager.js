const $ = require("jquery");

export default class HeaderManager {
    
    constructor(navIcon) {
        //seleccionamos el elemento de jquery en el constructor
        this.elementNavIcon = $(navIcon);
    }

    init() {

        let self = this;

        this.elementNavIcon.on("click", function() {
            let anchor = $(this);
            self.toggleNavIcon(anchor);
        });
    }

    toggleNavIcon(anchor) {
        anchor.toggleClass('open');
    }

}